import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import { plugins } from "./plugins.js";
import { PluginsPage } from "./preferences/PluginsPage.js";

export default class DashWidgetsPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new PluginsPage({ settings, plugins });

        window.add(page);
    }
}
