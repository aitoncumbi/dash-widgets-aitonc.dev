/**
 * 2026 © Aiton Cumbi,
 * All rights reserved.
 */
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import GObject from "gi://GObject";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { plugins as pluginList } from "./plugins.js";

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
  async enable() {
    this.dashContainer = new DashContainer();
    this.plugins = [];

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
    }

    Main.overview.dash._box.add_child(this.dashContainer);
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
  }
}
