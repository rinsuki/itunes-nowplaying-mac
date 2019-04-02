use scripting additions

on run
    tell application "iTunes"
        try
            set currentTrack to current track
        on error errMsg number errNum
            return
        end try
        set trackArtworks to []
        repeat with trackArtwork in currentTrack's artworks
            set imageData to trackArtwork's raw data
            set imageFormat to trackArtwork's format
            set imageBase64 to my artworkData(currentTrack's album, imageData, trackArtwork's format)
            if imageFormat = JPEG picture then
                set formatText to "JPEG"
            else
                set formatText to "PNG"
            end if
            if not (imageBase64 = (missing value)) then
                set trackArtworks to trackArtworks & [{|data|:imageBase64, |description|:trackArtwork's description, |downloaded|:trackArtwork's downloaded, |format|:formatText, |kind|:trackArtwork's kind}]
            end if
        end repeat
    end tell
    return trackArtworks
end run

on artworkData(albumName, imageData, imageFormat)
    set extention to ".png"
    if imageFormat = JPEG picture then
        set extention to ".jpg"
    end if
    try
        set a to (path to temporary items as text) & albumName & extention
        set targetFile to POSIX path of a
        set fh to open for access targetFile with write permission
        write imageData to fh
        close access fh
    on error errMsg number errNum
        try
            close access fh
        end try
        log {errNum, errMsg}
        return (missing value)
    end try
    set base64Str to do shell script "/usr/bin/base64 " & (quoted form of targetFile)
    tell application "System Events" to delete alias targetFile
    return base64Str
end artworkData

