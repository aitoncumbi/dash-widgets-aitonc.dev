import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import GObject from "gi://GObject";
import St from "gi://St";
import Clutter from "gi://Clutter";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import Gio from "gi://Gio";
import { plugins as allPluginNames } from "./plugins.js";

const DashContainer = GObject.registerClass(
  class DashContainer extends St.BoxLayout {
    _init() {
      super._init({
        style_class: "dash-widgets-container",
        vertical: true,
        x_expand: true,
        y_expand: true,
        y_align: Clutter.ActorAlign.CENTER,
      });
    }
  }
);

export default class DashWidgetsExtension extends Extension {
  enable() {
    // This is a map of: PluginId v/s [pluginWidget, dashContainer].
    this.plugins = new Map();

    this._settings = this.getSettings();

    this._onSettingsChanged();
    this._settingsSignalId = this._settings.connect(
      "changed::enabled-plugins",
      this._onSettingsChanged.bind(this)
    );

  }

  disable() {
    if (this._settingsSignalId) {
      this._settings.disconnect(this._settingsSignalId);
      this._settingsSignalId = null;
    }
    this._settings = null;

    for (const pluginName of this.plugins.keys()) {
      this._disablePlugin(pluginName);
    }

    if (this.dashContainer) {
      this.dashContainer.destroy();
      this.dashContainer = null;
    }
  }

  async _enablePlugin(pluginName) {
    if (this.plugins.has(pluginName)) return;

    try {
      const module = await import(`./plugins/${pluginName}/widget.js`);
      const widget = new module.default();
      widget.enable();

      const dashContainer = new DashContainer();
      dashContainer.add_child(widget, { expand: false });
      Main.overview.dash._box.add_child(dashContainer);

      this.plugins.set(pluginName, [widget, dashContainer]);
    } catch (e) {
      log(`Error enabling plugin ${pluginName}: ${e.stack}`);
    }
  }

  _disablePlugin(pluginName) {
    if (!this.plugins.has(pluginName)) return;

    const [widget, dashContainer] = this.plugins.get(pluginName);
    widget.disable();
    Main.overview.dash._box.remove_child(dashContainer);
    dashContainer.destroy();
    this.plugins.delete(pluginName);
  }

  _onSettingsChanged() {
    const enabledPlugins = this._settings.get_strv("enabled-plugins");

    // Reconcile all plugins, according to their updated state.
    for (const pluginName of allPluginNames) {
      const shouldBeEnabled = enabledPlugins.includes(pluginName);
      const isCurrentlyEnabled = this.plugins.has(pluginName);

      if (shouldBeEnabled && !isCurrentlyEnabled) {
        this._enablePlugin(pluginName);
      } else if (!shouldBeEnabled && isCurrentlyEnabled) {
        this._disablePlugin(pluginName);
      }
    }
  }
}
