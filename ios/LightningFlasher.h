//
//  LightningFlasher.h
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef LightningFlasher_h
#define LightningFlasher_h
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

@protocol FlashDelegate <NSObject>
@required
- (void) flashesComplete;
@end

@interface LightningFlasher: NSObject
{
  AVCaptureDevice *flashLight;
  NSTimer *flashTimer;
  int maxFlashes;
  id <FlashDelegate> _delegate;
}

@property (nonatomic, strong) id delegate;

- (void) flash:(int)withNumberOfFlashes;

@end

#endif /* LightningFlasher_h */
