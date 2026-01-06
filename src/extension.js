<<<<<<< HEAD
=======
import GLib from "gi://GLib";
>>>>>>> 321fe3f (Cleanup style.css)
import GObject from "gi://GObject";
import St from "gi://St";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
<<<<<<< HEAD:extension.js
import { plugins as pluginList } from "./plugins.js";
=======

import { MusicWidget } from "./widgets/musicPlayer/widget.js";
<<<<<<< HEAD
import { Players } from "./widgets/musicPlayer/helpers/player.js";
>>>>>>> db79ced (Cleanup project structure and preferences):src/extension.js

const DashContainer = GObject.registerClass(
  class DashContainer extends St.BoxLayout {
    _init() {
      super._init({
        style_class: "dash-widgets-container",
        vertical: true,
        x_expand: true,
        y_expand: true,
      });
    }
=======
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
>>>>>>> 321fe3f (Cleanup style.css)
  }

  update(player) {
    this._musicWidget.update(player);
  }
});

export default class DashWidgetsExtension extends Extension {
<<<<<<< HEAD:extension.js
  async enable() {
    this.dashContainer = new DashContainer();
    this.plugins = [];
=======
  enable() {
    this._players = new Players();
    this._dashContainer = new DashContainer(this._players);

    Main.overview.dash._box.add_child(this._dashContainer);

    this._updateTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
      this._players.updateFilterList();
      this._players.updateActiveList();

<<<<<<< HEAD
      this.currentPlayer = this.players.pick();
>>>>>>> db79ced (Cleanup project structure and preferences):src/extension.js

    for (const pluginName of pluginList) {
      try {
        const module = await import(`./plugins/${pluginName}/widget.js`);
        const Widget = module.default;
        const widget = new Widget();
        
        widget.enable();
        this.plugins.push(widget);
        this.dashContainer.add_child(widget);

      } catch (e) {
        log(`Error loading plugin ${pluginName}: ${e}`);
=======
      this._currentPlayer = this._players.pick();

      if (!this._currentPlayer || this._currentPlayer.playbackStatus === 'Stopped') {
        this._dashContainer.hide();
      } else {
        this._dashContainer.show();
        this._dashContainer.update(this._currentPlayer);
>>>>>>> 321fe3f (Cleanup style.css)
      }
<<<<<<< HEAD:extension.js
    }

    Main.overview.dash._box.add_child(this.dashContainer);
=======

      return GLib.SOURCE_CONTINUE;
    });
>>>>>>> db79ced (Cleanup project structure and preferences):src/extension.js
  }

  disable() {
<<<<<<< HEAD
    for (const plugin of this.plugins) {
      plugin.disable();
    }
    this.plugins = [];

    if (this.dashContainer) {
      this.dashContainer.destroy();
      this.dashContainer = null;
=======
    if (this._dashContainer) {
      this._dashContainer.destroy();
>>>>>>> 321fe3f (Cleanup style.css)
    }
<<<<<<< HEAD:extension.js
=======

    if (this._updateTimer) {
      GLib.source_remove(this._updateTimer);
    }
<<<<<<< HEAD
>>>>>>> db79ced (Cleanup project structure and preferences):src/extension.js
=======

    this._players = null;
    this._dashContainer = null;
    this._updateTimer = null;
    this._currentPlayer = null;
>>>>>>> 321fe3f (Cleanup style.css)
  }
}
