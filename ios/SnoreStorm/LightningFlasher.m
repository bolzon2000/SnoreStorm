//
//  LightningFlasher.m
//  SnoreStorm
//
//  Created by dave on 2/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "LightningFlasher.h"

@implementation LightningFlasher

-(id) init {
  self = [super init];
  if(self)
  {
    flashLight = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];

  }
  return self;
}

- (void) flash:(int)withNumberOfFlashes {
  NSLog(@"hereherherehrherherhe");
 maxFlashes = withNumberOfFlashes;
  
 if ([flashLight isTorchAvailable] && [flashLight isTorchModeSupported:AVCaptureTorchModeOn])
    {
      
      //get exclusive access to flash
      BOOL success = [flashLight lockForConfiguration:nil];
      if (success) {
      flashTimer = [NSTimer scheduledTimerWithTimeInterval:.5 target:self selector: @selector(hitFlash) userInfo: nil repeats: YES];
      }
    } else {
      //if flash is not supported we bail!
      NSLog(@"bailing");
      [self.delegate flashesComplete];
    }
}

-(void) hitFlash {
  NSLog(@"*********************BLARGH*********************");
  static int count;
  count++;
  NSLog(@"count %i and maxFlahse: %i",count,maxFlashes);
  if (maxFlashes == count) {
    count = 0;
    [flashTimer invalidate];
    [flashLight unlockForConfiguration];
    flashTimer = nil;
    //tell the caller we are done!
    NSLog(@"sendingbacktodelegatemethod" );
    [self.delegate flashesComplete];
  } else {
    [flashLight setTorchMode:AVCaptureTorchModeOn];
    [flashLight setTorchMode:AVCaptureTorchModeOff];
  }
}


@end
