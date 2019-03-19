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
            set imageData to trackArtwork's data
            set imageFormat to trackArtwork's format
            set imagePath to my tempFilePath(currentTrack's album, imageData, trackArtwork's format)
            if imageFormat = JPEG picture then
                set formatText to "JPEG"
            else
                set formatText to "PNG"
            end if
            if not (imagePath = (missing value)) then
                set trackArtworks to trackArtworks & [{|path|:imagePath, |description|:trackArtwork's description, |downloaded|:trackArtwork's downloaded, |format|:formatText, |kind|:trackArtwork's kind}]
            end if
        end repeat
    end tell
    return trackArtworks
end run

on tempFilePath(albumName, imageData, imageFormat)
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
        return targetFile
    on error errMsg number errNum
        try
            close access fh
        end try
        log {errNum, errMsg}
        return (missing value)
    end try
end tempFilePath

