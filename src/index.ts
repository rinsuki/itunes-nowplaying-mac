import { promisify } from "util"
import { execFile } from "child_process"
import { join } from "path"
const promisifyExecFile = promisify(execFile)

export async function getRawData() {
    try {
        const { stdout } = await promisifyExecFile(join(__dirname, "..", "jxa", "nowplaying-info.js"));
        let res = JSON.parse(stdout.toString())
        return res as {[key: string]: any} | null;
    } catch (e) {
        throw e
    }
}

export async function getThumbnailBuffer(databaseID: number) {
    const { stdout } = await promisifyExecFile(join(__dirname, "..", "jxa", "get-thumbnail"), [databaseID.toString()], {
        maxBuffer: 64 * 1024 * 1024,
        encoding: "buffer"
    })
    return stdout as Buffer
}

async function getData() {
    const res = await getRawData()
    if (res == null) {
        return null
    }
    return {
        databaseID: res.databaseID as number,
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
    }
}

Object.defineProperty(getData, "default", {value: getData})
module.exports = getData
module.exports.getRawData = getRawData
module.exports.getThumbnailBuffer = getThumbnailBuffer

export default getData