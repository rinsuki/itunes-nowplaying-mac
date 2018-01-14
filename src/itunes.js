var itunes = Application("iTunes")
var track = itunes.currentTrack.properties()
function run(argv) {
    Object.keys(track).filter(name => {
        if (name.startsWith("purchase") || name.endsWith("ID")) {
            track[name] = undefined
        }
    })
    return JSON.stringify(track, null, 4)
}