#import <Foundation/Foundation.h>
#import <ScriptingBridge/ScriptingBridge.h>
#import "Music.h"

NSString* itunesBundleId() {
    if ([NSFileManager.defaultManager fileExistsAtPath: @"/Applications/iTunes.app"]) {
        return @"com.apple.iTunes";
    } else {
        return @"com.apple.Music";
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s ITUNES_TRACK_DATABASE_ID\n\nReturn: artwork Image Binary\n", argc == 1 ? argv[0] : "(command)");
        return 1;
    }
    NSInteger databaseId = @(argv[1]).integerValue;
    if (databaseId == 0) {
        fprintf(stderr, "Error: ITUNES_TRACK_DATABASE_ID must be integer\n");
        return 2;
    }

    NSPredicate* pred = [NSPredicate predicateWithFormat: @"databaseID = %ld", databaseId];

    MusicApplication* app = [SBApplication applicationWithBundleIdentifier: itunesBundleId()];
    if (app == NULL) {
        fprintf(stderr, "Error: Failed to find iTunes or Music.app\n");
        return 101;
    }
    MusicTrack* track = [app.tracks filteredArrayUsingPredicate: pred].firstObject;
    if (track == NULL) {
        fprintf(stderr, "Error: Track not found\n");
        return 3;
    }
    NSData* artwork = track.artworks.firstObject.rawData;
    if (![artwork isKindOfClass: NSData.class]) artwork = ((NSAppleEventDescriptor*)((SBObject*)artwork).get).data;
    if (artwork.length == 0) {
        fprintf(stderr, "Error: artwork not found\n");
        return 4;
    }
    fwrite(artwork.bytes, 1, artwork.length, stdout);
    return 0;
}