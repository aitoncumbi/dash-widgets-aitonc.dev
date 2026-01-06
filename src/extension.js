import GLib from "gi://GLib";
import GObject from "gi://GObject";
import St from "gi://St";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

import { MusicWidget } from "./widgets/musicPlayer/widget.js";
import { Players } from "./widgets/musicPlayer/player.js";

const DashContainer = GObject.registerClass(
class DashContainer extends St.BoxLayout {
  _init(players) {
    super._init({
      style_class: "dash-widget-container",
      vertical: true,
      x_expand: true,
      y_expand: true
    });

    this._musicWidget = new MusicWidget(players);

    this.add_child(this._musicWidget);
  }

  update(player) {
    this._musicWidget.update(player);
  }
});

export default class DashWidgetsExtension extends Extension {
  enable() {
    this._players = new Players();
    this._dashContainer = new DashContainer(this._players);

    Main.overview.dash._box.add_child(this._dashContainer);

    this._updateTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
      this._players.updateFilterList();
      this._players.updateActiveList();

      this._currentPlayer = this._players.pick();

      if (!this._currentPlayer || this._currentPlayer.playbackStatus === 'Stopped') {
        this._dashContainer.hide();
      } else {
        this._dashContainer.show();
        this._dashContainer.update(this._currentPlayer);
      }

      return GLib.SOURCE_CONTINUE;
    });
  }

  disable() {
    if (this._dashContainer) {
      this._dashContainer.destroy();
    }

    if (this._updateTimer) {
      GLib.source_remove(this._updateTimer);
    }

    this._players = null;
    this._dashContainer = null;
    this._updateTimer = null;
    this._currentPlayer = null;
  }
}
