//
//  GraphManager.m
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "GraphGenerator.h"
#import "GraphManager.h"

@implementation GraphManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(dataArray, NSArray)
RCT_EXPORT_VIEW_PROPERTY(dummy, NSString)

- (UIView *)view
{
  NSLog(@"in view");
  return [[GraphGenerator alloc] init];
  
}




@end
