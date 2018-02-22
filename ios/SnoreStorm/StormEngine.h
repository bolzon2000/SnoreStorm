//
//  StormEngine.h
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef StormEngine_h
#define StormEngine_h

#import "SnoreData.h"
#import <AVFoundation/AVFoundation.h>
#import <CoreAudio/CoreAudioTypes.h>
#import <React/RCTEventEmitter.h>
#import "ThunderPlayer.h"
#import "LightningFlasher.h"
#import "GraphGenerator.h"

@interface StormEngine: RCTEventEmitter <RCTBridgeModule, ThunderDelegate, FlashDelegate>
{
  NSTimer *myLoop;
  NSDate *startTime;
  int snoreCount;
  int snoresThisMinute;
  NSTimer *snoreTimer;
  NSTimer *appTimer;
  double lowPassResults;
  AVAudioRecorder *recorder;
  NSMutableArray *snoresByMinute;
  bool timerPaused;
  ThunderPlayer *thunderPlayer;
  LightningFlasher *lightningFlasher;
  bool thunderPlaying;
  bool flashing;

}

@property SnoreData *snoreData;

- (void) startTimer;
- (void) pauseTimer;
- (void) resumeTimer;
- (void) reset;
- (void) stopTimer;


@end


#endif /* StormEngine_h */
