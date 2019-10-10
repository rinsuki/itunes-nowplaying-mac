#!/usr/bin/osascript -l JavaScript
function run(argv) {
    var itunes = $.NSFileManager.defaultManager.fileExistsAtPath("/Applications/iTunes.app") ? Application("iTunes") : Application("Music")
    var track = itunes.currentTrack

    var state = itunes.playerState()
    if (state != "playing" && state != "paused") {
        return "null"
    }
    track = track.properties()
    Object.keys(track).filter(function (name) {
        if (name.startsWith("purchase") || name.endsWith("ID")) {
            track[name] = undefined
        }
    })
    track.state = state
    return JSON.stringify(track, null, 4)
}