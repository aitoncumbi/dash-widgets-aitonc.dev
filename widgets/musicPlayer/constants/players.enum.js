/**
 * 2026 © Aiton Cumbi,
 * All rights reserved.
 * Contains the MPRIS D-Bus names for various music players.
 * These constants are used to identify and interact with the player applications icons on the dash.
 * For future implementation where the player icon is replaced by the widget when the player is active.
 * TODO: Implement dynamic icon replacement based on player activity. 
 */

export default {
    SPOTIFY: 'org.mpris.MediaPlayer2.spotify',
    RHYTHMBOX: 'org.mpris.MediaPlayer2.rhythmbox',
    CLEMENTINE: 'org.mpris.MediaPlayer2.clementine',
    VLC: 'org.mpris.MediaPlayer2.vlc',
    MPV: 'org.mpris.MediaPlayer2.mpv',
    GUVCVIEW: 'org.mpris.MediaPlayer2.guvcview',
    GOOGLECHROME: 'org.mpris.MediaPlayer2.chrome',
    FIREFOX: 'org.mpris.MediaPlayer2.firefox',
    GENERIC: 'org.mpris.MediaPlayer2.',
}