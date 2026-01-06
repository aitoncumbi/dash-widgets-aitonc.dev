# 🖥️ Gnome Dash Widgets

<p align="left">
  <img src="https://skillicons.dev/icons?i=gtk,js,css" alt="Technologies" />
</p>

> Modern widget integration for the GNOME Dash

A collection of custom widgets designed to enhance the GNOME Shell dash, providing additional functionality and improved user interaction directly within the dash area.

One of the completed widgets is a **media player controller**, which displays and controls the currently playing media.

---

## ⚡ Features

### Media Player Widget (Implemented)
- 📻 Automatic update of media metadata (track title, artist, album)
- 🔄 Switches to the most recently active MPRIS-compatible player
- ⏭️ Skip to the next track
- ⏸️ Play/pause functionality (currently updates the playback status icon; direct control is in development)
- 🎨 Widget background dynamically updates to the dominant color extracted from the album art
- ❌ Widget automatically hides when no media players are active (e.g., when the application is closed)

Special thanks to the community members who provided assistance during development. This widget utilizes the MPRIS proxy player implementation from the [Gnome Mpris Label](https://github.com/Moon-0xff/gnome-mpris-label) extension by **Moon-0xff**.

Additional widgets are planned for future implementation.

### More widgets
> Will be added soon

---

## 📸 Screenshots

<!-- Add screenshots of the media widget in action here once available -->
| Media Widget (Playing) |
|------------------------|
| ![Playing](assets/Screenshot01.png) |
 Media Widget (Paused) |
 ![Paused](assets/Screenshot02.png) |
 Background Color Adaptation |
 ![Color Adaptation](assets/Screenshot03.png) |
| No Active Player |
| ![No Player](assets/Screenshot04.png) |
 Widget Controls |
| 🛑 Not realised now 🛑 |
 <!-- ![Controls](assets/media-controls.png) | -->
---

## 🚀 Getting Started

To install the extension locally for testing:

```bash
git clone https://github.com/aitoncumbi/dash-widgets-aitonc.dev.git
cd gnome-dash-widgets
# Copy to the GNOME extensions directory
cp -r . ~/.local/share/gnome-shell/extensions/dash-widgets@aitonc.dev.git
# Restart GNOME Shell (Alt+F2, type 'r', work only in X session) or Re-login
```

## ✨ Credits & Acknowledgements

- Special thanks to Moon-0xff - for the MPRIS proxy player implementation
[(from GNOME MPRIS Label)](https://github.com/Moon-0xff/gnome-mpris-label)

- GNOME community members who provided feedback and ideas

## 👩‍💻 Author
Developer: [aitoncumbi](https://github.com/aitoncumbi)  
Readme.md desing: [Miocasa](https://github.com/Miocasa)
