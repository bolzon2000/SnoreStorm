//
//  ThunderPlayer.m
//  SnoreStorm
//
//  Created by dave on 2/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ThunderPlayer.h"

@implementation ThunderPlayer

- (void) playAudio {

  thunderClip = [self getRandomClip];
  [self initializeAudio:thunderClip];
  [thunderPlayer play];
  
}

- (void) initializeAudio:(NSString *)clip {
  
  
  NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle]
                                       pathForResource:clip
                                       ofType:@"mp3"]];

  
  NSError *error;
  thunderPlayer = [[AVAudioPlayer alloc]
                  initWithContentsOfURL:url
                  error:&error];
  thunderPlayer.delegate = self;
  
  if (error)
  {
    NSLog(@"Error in audioPlayer: %@",
          [error localizedDescription]);
  } else {
    [thunderPlayer prepareToPlay];
  }
}

- (NSString *)getRandomClip {
  
  int i = rand()%3 +1;
  NSString *thunderValue = [NSString stringWithFormat:@"thunder%i",i];
  return thunderValue;
  
}

-(void)audioPlayerDidFinishPlaying:
(AVAudioPlayer *)player successfully:(BOOL)flag
{
  [self.delegate thunderComplete];
}

@end

