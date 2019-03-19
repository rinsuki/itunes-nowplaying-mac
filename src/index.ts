import * as child_process from "child_process"
import * as path from "path"

export async function getRawData() {
    const raw_res = await new Promise<string>((resolve, reject) => {
        var stdout = ""
        var stderr = ""
        var process = child_process.spawn("osascript", [path.join(__dirname, "itunes.js")])
        process.stdout.on("data", (data) => {
            if (data instanceof Buffer) {
                data = data.toString("utf-8")
            }
            stdout += data
        })
        process.stderr.on("data", (data) => {
            if (data instanceof Buffer) {
                data = data.toString("utf-8")
            }
            stderr += data
        })
        process.on("close", (code) => {
            if (code != 0) {
                reject(stderr)
            } else {
                resolve(stdout)
            }
        })
    })
    const res = JSON.parse(raw_res)
    return res as {[key: string]: any} | null;
}
async function getData() {
    const res = await getRawData()
    if (res == null) {
        return null
    }
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
        state: res.state as "playing" | "paused",
        artwork: res.artworks[0] as {[key: string]: any} | null,
    }
}

Object.defineProperty(getData, "default", {value: getData})
module.exports = getData
module.exports.getRawData = getRawData

export default getData