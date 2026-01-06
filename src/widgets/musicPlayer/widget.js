import GObject from "gi://GObject";
import St from "gi://St";
import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import { Players } from "./helpers/player.js";

export default GObject.registerClass(
  class MusicWidget extends St.BoxLayout {
    _init() {
      super._init({
        style_class: "music-player-widget",
        vertical: false,
        x_expand: false,
        y_expand: true,
        visible: false,
      });

      this._musicMetadata = new St.BoxLayout({
        style_class: "music-metadata",
        vertical: true,
        x_expand: true,
        y_expand: true,
        x_align: Clutter.ActorAlign.START,
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._musicControls = new St.BoxLayout({
        style_class: "music-controls",
        vertical: false,
        x_expand: false,
        y_expand: true,
        x_align: Clutter.ActorAlign.END,
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._playPauseButton = new St.Button({
        style_class: "music-play-pause-button",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._nextButton = new St.Button({
        style_class: "music-next-button",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._musicArtist = new St.Label({
        style_class: "music-artist",
        text: "",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._musicTitle = new St.Label({
        style_class: "music-title",
        text: "",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._musicAlbumArt = new St.Bin({
        style_class: "music-album-art",
        y_align: Clutter.ActorAlign.CENTER,
        clip_to_allocation: true,
      });

      this._musicAlbumArtFallback = new St.Icon({
        style_class: "music-album-art-fallback",
        icon_name: "audio-x-generic-symbolic",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this.playIcon = new St.Icon({
        style_class: "music-play-icon",
        icon_name: "media-playback-start-symbolic",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this.pauseIcon = new St.Icon({
        style_class: "music-pause-icon",
        icon_name: "media-playback-pause-symbolic",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this.nextIcon = new St.Icon({
        style_class: "music-next-icon",
        icon_name: "media-skip-forward-symbolic",
        y_align: Clutter.ActorAlign.CENTER,
      });

      this._musicMetadata.add_child(this._musicTitle);
      this._musicMetadata.add_child(this._musicArtist);
      this._musicAlbumArt.set_child(this._musicAlbumArtFallback);

      this._musicControls.add_child(this._playPauseButton);
      this._musicControls.add_child(this._nextButton);

      this._playPauseButton.set_child(this.playIcon);
      this._nextButton.set_child(this.nextIcon);

      this._playPauseButton.connect("clicked", () => {
        if (this._player) {
          this._player.toggleStatus();
        }
      });

      this._nextButton.connect("clicked", () => {
        if (this._player) {
          this._player.goNext();
        }
      });

      this.add_child(this._musicAlbumArt);
      this.add_child(this._musicMetadata);
      this.add_child(this._musicControls);
    }

    enable() {
        this.players = new Players();
        this.timer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            this.players.updateFilterList();
            this.players.updateActiveList();

            const currentPlayer = this.players.pick();

            if (!currentPlayer || currentPlayer.playbackStatus == 'Stopped') {
              this.hide();
            } else {
              this.show();
              this.update(currentPlayer);
            }

            return GLib.SOURCE_CONTINUE;
        });
    }

    disable() {
        if (this.timer) {
            GLib.source_remove(this.timer);
            this.timer = null;
        }
        this.players = null;
    }

    update(player) {
      this._player = player;
      if (!player) {
        this._musicTitle.set_text("");
        this._musicArtist.set_text("");
        this._musicAlbumArt.set_child(this._musicAlbumArtFallback);
        this.style = "";
        this._playPauseButton.set_child(this.playIcon);
        return;
      }

      const title = player.stringFromMetadata("xesam:title") || "Unknown Title";
      const artist =
        player.stringFromMetadata("xesam:artist") || "Unknown Artist";

      const artUrl = player.getArtUrlIcon(28);

      let dominantColor = null;
      if(artUrl) {
        artUrl.style = "padding: 0px; border-radius: 8px;";
      }

      if (artUrl) {
        this._musicAlbumArt.set_child(artUrl);
        dominantColor = player.getAlbumArtDominantColor();
      } else {
        this._musicAlbumArt.set_child(this._musicAlbumArtFallback);
      }

      this.style = dominantColor
        ? `background-color: rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}, 1);`
        : "";

      this._musicTitle.set_text(title);
      this._musicArtist.set_text(artist);

      const isPlaying = player.playbackStatus === "Playing";
      this._playPauseButton.set_child(
        isPlaying ? this.pauseIcon : this.playIcon
      );

      this._musicMetadata.reactive = true;
      if (this._musicMetadataSignal) {
        this._musicMetadata.disconnect(this._musicMetadataSignal);
      }
      this._musicMetadataSignal = this._musicMetadata.connect(
        "button-press-event",
        () => {
          player.activatePlayer();
          return Clutter.EVENT_STOP;
        }
      );
    }
  }
);
