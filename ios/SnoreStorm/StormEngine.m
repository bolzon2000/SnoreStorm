//
//  StormEngine.m
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "StormEngine.h"


@implementation StormEngine

//export a module to javascript named StormEngine
RCT_EXPORT_MODULE();

//define the events that will be listened to
- (NSArray<NSString *> *)supportedEvents {
  return @[@"snoreDataCallback"];
}

// export the start method to javascript
RCT_EXPORT_METHOD(startTimer)
{
  //these items stay, even on reset/stop/start
  //below is the delegate for thunder completion
  thunderPlayer = [ThunderPlayer alloc];
  thunderPlayer.delegate = self;
  lightningFlasher = [[LightningFlasher alloc] init];
  lightningFlasher.delegate = self;
  [self initializeEngine];
}

RCT_EXPORT_METHOD(pauseTimer) {
  timerPaused = YES;
}

RCT_EXPORT_METHOD(resumeTimer) {
  timerPaused = NO;
}


RCT_EXPORT_METHOD(reset) {
  
  //just need to stop the timers, everything else is re-initialized
  //in the intialization method on re-start
  [self stopTimers];
}

RCT_EXPORT_METHOD(stopTimer) {
  
  [self stopTimers];
  
  for (int x=0; x < [snoresByMinute count]; x++)
    NSLog (@"snore for minute: %i are: %i", x, [[snoresByMinute objectAtIndex:x] intValue]);
  /*
  GraphGenerator *snoreGraph = [[GraphGenerator alloc] init];
  UIView *graphView = [snoreGraph getGraph:snoresByMinute testing:YES];
  
  rctViewClass = [RCTViewClass alloc];
  rctViewClass.moduleName = "@snoreGraph";
  
  
  [rctViewClass.bridge initial
  [rctViewClass rctv]
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ImageBrowserApp"
                                            initialProperties:props];
  
  return graphView;
  //SnoreData *mySnoreData = [SnoreData alloc];
  //mySnoreData.snoreCount = 30;
  //mySnoreData.startTime;
  //mySnoreData.endTime = [NSDate date];
  */
}

- (void) initializeEngine {
  
  //reset everything in case we've hit the reset button
  startTime = [NSDate date];
  timerPaused = NO;
  snoresThisMinute = 0;
  snoreCount = 0;
  thunderPlaying = NO;
  flashing = NO;
  
  if (!snoresByMinute)
    snoresByMinute = [NSMutableArray array];
  else
    [snoresByMinute removeAllObjects];
  
  //have to run timers on main queue so as not to interfere with react-native
  dispatch_async(dispatch_get_main_queue(), ^{
    [self startAppLoop];
    [self snoreListener];
  });
}

- (void) stopTimers {
  [appTimer invalidate];
  appTimer = nil;
  [snoreTimer invalidate];
  snoreTimer = nil;
}

/*************************
 this is the loop that records how many snores we've had each minute
 **************************/
- (void) startAppLoop {

  appTimer = [NSTimer scheduledTimerWithTimeInterval: 60.0 target: self selector: @selector(snoreCounter) userInfo: nil repeats: YES];
}

/*************************
 we're counting snores every minute, so reset the snores back to zero every
 minute. MinuteCounter will index the snoresByMinuteArray
 **************************/
- (void)snoreCounter {

  [snoresByMinute addObject:[NSNumber numberWithInteger:snoresThisMinute]];
  snoresThisMinute = 0;
}

- (void) snoreListener {

  //because we are throwing away the recording, send it to dev/null
  NSURL *url = [NSURL fileURLWithPath:@"/dev/null"];
  //NSURL *url = [NSURL fileURLWithPath:NSTemporaryDirectory()];
  
  NSDictionary *settings = [NSDictionary dictionaryWithObjectsAndKeys:
                            [NSNumber numberWithFloat: 44100.0],                 AVSampleRateKey,
                            [NSNumber numberWithInt: kAudioFormatAppleLossless], AVFormatIDKey,
                            [NSNumber numberWithInt: 1],                         AVNumberOfChannelsKey,
                            [NSNumber numberWithInt: AVAudioQualityMax],         AVEncoderAudioQualityKey,
                            nil];
  
  NSError *error;
  
  recorder = [[AVAudioRecorder alloc] initWithURL:url settings:settings error:&error];
  
  NSError *errorAudioSession;
  [[AVAudioSession sharedInstance]
   setCategory:AVAudioSessionCategoryPlayAndRecord error:&errorAudioSession];
  
  if (errorAudioSession) {
    NSLog(@"Error description: %@", [errorAudioSession description]);
  }
  

  if (recorder) {
    [recorder prepareToRecord];
    recorder.meteringEnabled = YES;
    [recorder record];
    snoreTimer = [NSTimer scheduledTimerWithTimeInterval: 1.0 target: self selector: @selector(snoreTimerCallback) userInfo: nil repeats: YES];
    
  } else
    NSLog(@"error Will Robinson error, %@", error.description);
}

- (void)snoreTimerCallback {
  NSLog(@"in snore callback");
  // if we're paused, or thunder is playin no reason to continue, timer can keep going, but we won't capture data
  NSLog(@"flashing not quite sure %d",flashing);
  if (timerPaused || thunderPlaying || flashing)
    return;
  
  [recorder updateMeters];
  
  //const double ALPHA = 0.05;
  //double peakPowerForChannel = pow(10, (0.05 * [recorder peakPowerForChannel:0]));
  //lowPassResults = ALPHA * peakPowerForChannel + (1.0 - ALPHA) * lowPassResults;
  
  //NSLog(@"Average input: %f Peak input: %f Low pass results: %f", [recorder averagePowerForChannel:0], [recorder peakPowerForChannel:0], lowPassResults);
  //NSLog(@"averagePower %f",[recorder averagePowerForChannel:0]);
  NSLog(@"decibels %f",20 * log10(5 * powf(10, ([recorder averagePowerForChannel:0]/20)) * 160) + 50);
  double decibels = (20 * log10(5 * powf(10, ([recorder averagePowerForChannel:0]/20)) * 160) + 50);

  if (decibels > 60) {
    snoresThisMinute++;
    snoreCount++;
    
    thunderPlaying = YES;
    flashing = YES;
    
    [thunderPlayer playAudio];
    [lightningFlasher flash:4];
    
    //send event back to javascript
    [self sendEventWithName:@"snoreDataCallback" body:[NSString stringWithFormat:@"%i",snoreCount]];
    
  }
  
}

-(void)thunderComplete
{
  thunderPlaying = NO;
}

-(void)flashesComplete
{
  NSLog(@"flashing here ");
  flashing = NO;
}

@end
