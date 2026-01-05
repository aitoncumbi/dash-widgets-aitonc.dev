/**
 * 2026 © Aiton Cumbi,
 * All rights reserved.
 */
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import GObject from "gi://GObject";
import GLib from "gi://GLib";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { MusicWidget } from "./widgets/musicPlayer/widget.js";
import { Players } from "./widgets/musicPlayer/helpers/player.js";

const DashContainer = GObject.registerClass(
  class DashContainer extends St.BoxLayout {
    _init(players) {
      super._init({
        style_class: "dash-widgets-container",
        vertical: true,
        x_expand: true,
        y_expand: true,
      });
      this.musicPlayerWidget = new MusicWidget(players);
      this.add_child(this.musicPlayerWidget);
    }

    update(player) {
      this.musicPlayerWidget.update(player);
    }
  }
);

export default class DashWidgetsExtension extends Extension {
  enable() {
    this.players = new Players();
    this.currentPlayer = this.players.pick();
    this.dashContainer = new DashContainer(this.players);
    Main.overview.dash._box.add_child(this.dashContainer);
    this.timer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
      
        this.players.updateFilterList();
      this.players.updateActiveList();
      
      this.currentPlayer = this.players.pick();

      if (!this.currentPlayer || this.currentPlayer.playbackStatus == 'Stopped') {
        this.dashContainer.hide();
      } else {
        this.dashContainer.show();
        this.dashContainer.update(this.currentPlayer);
      }
      
      return GLib.SOURCE_CONTINUE;
    });
  }
  disable() {
    if (this.dashContainer) {
      this.dashContainer.destroy();
      this.dashContainer = null;
    }
    if (this.timer) {
      GLib.source_remove(this.timer);
      this.timer = null;
    }
  }
}
