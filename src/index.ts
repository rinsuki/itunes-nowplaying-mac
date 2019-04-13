import { promisify } from "util"
import { execFile } from "child_process"
import { join } from "path"
const promisifyExecFile = promisify(execFile)

interface JXAOpts {
    withoutArtworks?: boolean;
}
export async function getRawData(opts: JXAOpts = {}) {
    let cmdArgs = opts.withoutArtworks ? [
        "-without-artworks"
    ] : []
    try {
        const { stdout } = await promisifyExecFile(join(__dirname, "itunes.js"), cmdArgs);
        let res = JSON.parse(stdout.toString())
        return res as {[key: string]: any} | null;
    } catch (e) {
        throw e
    }
}
async function getData() {
    const res = await getRawData({withoutArtworks:true})
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
        existsArtwork: res.existsArtwork as boolean,
    }
}

Object.defineProperty(getData, "default", {value: getData})
module.exports = getData
module.exports.getRawData = getRawData

export default getData