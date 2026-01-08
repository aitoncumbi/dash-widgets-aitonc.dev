import Adw from "gi://Adw?version=1";
import GObject from "gi://GObject";
import { gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export var PluginsPage = GObject.registerClass(
  class PluginsPage extends Adw.PreferencesPage {
    _init(params) {
      super._init({
        title: _("Plugins"),
        iconName: 'application-x-addon-symbolic',
      });

      const settings = params.settings;
      const plugins = params.plugins;

      const group = new Adw.PreferencesGroup({
        title: _("Available Plugins"),
        description: _("Plugins to enable in the dock"),
      });
      this.add(group);

      for (const pluginName of plugins) {
        const row = new Adw.SwitchRow({
          title: pluginName,
          subtitle: _(`Enable ${pluginName} widget`),
        });
        group.add(row);

        let enabledPlugins = settings.get_strv("enabled-plugins");
        row.set_active(enabledPlugins.includes(pluginName));

        row.connect("notify::active", (widget) => {
          let currentEnabledPlugins = settings.get_strv("enabled-plugins");
          if (widget.active) {
            if (!currentEnabledPlugins.includes(pluginName)) {
              currentEnabledPlugins.push(pluginName);
            }
          } else {
            currentEnabledPlugins = currentEnabledPlugins.filter(
              (name) => name !== pluginName
            );
          }
          settings.set_strv("enabled-plugins", currentEnabledPlugins);
        });
      }
    }
  }
);
