import * as child_process from "child_process"
import * as path from "path"

export async function getRawData() {
    const raw_res = await new Promise<string>((resolve, reject) => {
        child_process.spawn("osascript", [path.join(__dirname, "itunes.js")]).stdout.on("data", (data) => {
            if (data instanceof Buffer) {
                data = data.toString("utf-8")
            }
            resolve(data)
        })
    })
    const res = JSON.parse(raw_res)
    return res
}
async function getData() {
    const res = await getRawData()
    return {
        name: res.name as string,
        duration: res.duration as number,
        artist: res.artist as string,
        composer: res.composer as string,
        album: {
            name: res.album as string,
            artist: res.albumArtist as string,
            loved: res.albumLoved as boolean,
            disliked: res.albumDisliked as boolean,
        },
        genre: res.genre as string,
        track: {
            length: res.trackCount as number,
            number: res.trackNumber as number,
        },
        disc: {
            length: res.discCount as number,
            number: res.discNumber as number,
        },
        sampleRate: res.sampleRate as number,
        comment: res.comment as string,
        loved: res.loved as boolean,
        disliked: res.disliked as boolean,
    }
}

Object.defineProperty(getData, "default", {value: getData})
module.exports = getData
module.exports.getRawData = getRawData

export default getData