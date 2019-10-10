#!/bin/zsh
ITUNES_APP=/System/Applications/Music.app
if [ -d /Applications/iTunes.app ]; then
    ITUNES_APP=/Applications/iTunes.app
fi

cd src

sdef $ITUNES_APP | sdp -fh --basename Music