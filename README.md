# itunes-nowplaying-mac

## Tested:

- macOS Catalina 10.15 (19A583) + Music.app (1.0.0.426)
- macOS Mojave 10.14.6 (18G103) + iTunes.app (12.9.5.5)


## install

```
npm install itunes-nowplaying-mac
```

## how to use

TypeScript: 

```typescript
import nowplaying from "itunes-nowplyaing-mac"
nowplaying().then(console.log)

import {getRawData as nowplaying} from "itunes-nowplaying-mac"
nowplaying().then(console.log) // return iTunes raw data
```

JavaScript:
```javascript
const nowplaying = require("itunes-nowplaying-mac")
nowplaying().then(console.log)

nowplaying.getRawData().then(console.log) // return iTunes raw data
```

## example return data

### Local File

```json
{
    "databaseID": 999999,
    "name": "AnemoneStar",
    "duration": 211.29299926757812,
    "artist": "渋谷凛 (福原綾香)",
    "composer": "Yasushi",
    "album": {
        "name": "THE IDOLM@STER CINDERELLA GIRLS STARLIGHT MASTER 01",
        "artist": "",
        "loved": false,
        "disliked": false
    },
    "genre": "Soundtrack",
    "track": {
        "length": 7,
        "number": 3
    },
    "disc": {
        "length": 1,
        "number": 1
    },
    "sampleRate": 44100,
    "comment": "",
    "loved": true,
    "disliked": false,
    "state": "playing",
    "location": "/path/to/music/file/THE IDOLM@STER CINDERELLA GIRLS STARLIGHT MASTER 01/03 AnemoneStar.m4a"
}
```

### Streaming from iTunes Store

`location` will be gone because it doesn't exist on file system.

```json
{
    "databaseID": 9999999,
    "name": "ガールズ・イン・ザ・フロンティア (M@STER VERSION)",
    "duration": 254.9010009765625,
    "artist": "渋谷凛 (CV: 福原綾香), 早坂美玲 (CV: 朝井彩加), 木村夏樹 (CV: 安野希世乃), 小日向美穂 (CV: 津田美波) & 塩見周子 (CV: ルゥ ティン)",
    "composer": "Tetsuya Shitara & Cygames",
    "album": {
        "name": "ガールズ・イン・ザ・フロンティア (M@STER VERSION) - Single",
        "artist": "渋谷凛 (CV: 福原綾香), 早坂美玲 (CV: 朝井彩加), 木村夏樹 (CV: 安野希世乃), 小日向美穂 (CV: 津田美波) & 塩見周子 (CV: ルゥ ティン)",
        "loved": false,
        "disliked": false
    },
    "genre": "アニメ",
    "track": {
        "length": 1,
        "number": 1
    },
    "disc": {
        "length": 1,
        "number": 1
    },
    "sampleRate": 44100,
    "comment": "",
    "loved": false,
    "disliked": false,
    "state": "playing"
}
```