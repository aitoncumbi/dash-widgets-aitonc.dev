import GObject from "gi://GObject";
import St from "gi://St";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
<<<<<<< HEAD:extension.js
import { plugins as pluginList } from "./plugins.js";
=======

import { MusicWidget } from "./widgets/musicPlayer/widget.js";
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
  }
);

export default class DashWidgetsExtension extends Extension {
<<<<<<< HEAD:extension.js
  async enable() {
    this.dashContainer = new DashContainer();
    this.plugins = [];
=======
  enable() {
    this.players = new Players();
    this.currentPlayer = this.players.pick();
    this.dashContainer = new DashContainer(this.players);

    Main.overview.dash._box.add_child(this.dashContainer);

    this.timer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
      this.players.updateFilterList();
      this.players.updateActiveList();

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
    for (const plugin of this.plugins) {
      plugin.disable();
    }
    this.plugins = [];

    if (this.dashContainer) {
      this.dashContainer.destroy();
      this.dashContainer = null;
    }
<<<<<<< HEAD:extension.js
=======

    if (this.timer) {
      GLib.source_remove(this.timer);
      this.timer = null;
    }
>>>>>>> db79ced (Cleanup project structure and preferences):src/extension.js
  }
}
