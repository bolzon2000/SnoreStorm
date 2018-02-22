//
//  ThunderPlayer.h
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef ThunderPlayer_h
#define ThunderPlayer_h
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

@protocol ThunderDelegate <NSObject>
@required
- (void) thunderComplete;
@end

@interface ThunderPlayer: NSObject <AVAudioPlayerDelegate>
{
  AVAudioPlayer *thunderPlayer;
  NSString *thunder;
  NSString *thunderClip;
  id <ThunderDelegate> _delegate;

}
@property (nonatomic, strong) id delegate;

- (void) playAudio;

@end

#endif /* ThunderPlayer_h */
