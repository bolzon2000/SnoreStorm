//
//  SnoreData.h
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef SnoreData_h
#define SnoreData_h
#import <Foundation/Foundation.h>

@interface SnoreData: NSObject

@property int snoreCount;
@property NSDate *startTime;
@property NSDate *endTime;
@property NSString *sensitivitySetting;
@property NSString *thunderSetting;
@property NSString *lightningSetting;

@end

#endif /* SnoreData_h */
