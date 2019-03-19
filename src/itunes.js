var app = Application.currentApplication()
app.includeStandardAdditions = true
var pathToMe = app.pathTo(this)
  , containerPath = Application('System Events').files[pathToMe.toString()].container().posixPath()
  , itunes = Application('iTunes')
  , currentTrack = itunes.currentTrack

function run(argv) {
    var state = itunes.playerState()
    if (state != "playing" && state != "paused") {
        return "null"
    }
    var track = currentTrack.properties()
    Object.keys(track).filter(function (name) {
        if (name.startsWith("purchase") || name.endsWith("ID")) {
            track[name] = undefined
        }
    })
    track.state = state
    track.artworks = []
    if (currentTrack.existArtworks) {
        track.artworks = app.runScript(Path(containerPath +"/itunes.scpt"))
    }
    return JSON.stringify(track, null, 4)
}