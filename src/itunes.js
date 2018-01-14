var itunes = Application("iTunes")
var track = itunes.currentTrack
function run(argv) {
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
    return JSON.stringify(track, null, 4)
}