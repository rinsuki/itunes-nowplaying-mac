jxa/get-thumbnail: src/get-artwork.m src/Music.h
	clang -o $@ $< -framework Foundation -framework ScriptingBridge
src/Music.h:
	build-scripts/generate-music-header.sh
clean:
	rm jxa/get-thumbnail src/Music.h