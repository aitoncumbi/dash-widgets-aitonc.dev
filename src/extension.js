import St from "gi://St";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import { MusicWidget } from "./widgets/musicPlayer/widget.js";

export default class DashWidgetsExtension extends Extension {
  enable() {
    this._widgets = [
      new MusicWidget()
    ];

    // TODO: hide dash container when no visible widgets
    // TODO: update when monitors change
    // TODO: Rounded cover image
    this._dashContainer = new St.BoxLayout({
      style_class: "dash-widget-container",
      vertical: true,
      y_align: Clutter.ActorAlign.CENTER,
      x_expand: true,
      y_expand: true
    });

    this._widgets.forEach(widget => {
      this._dashContainer.add_child(widget);
    });

    Main.overview.dash._box.add_child(this._dashContainer);
  }

  disable() {
    this._widgets.forEach(widget => {
      widget.destroy();
    });

    if (this._dashContainer) {
      this._dashContainer.destroy();
    }

    this._widgets = null;
    this._dashContainer = null;
  }
}
