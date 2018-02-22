//
//  GraphGenerator.h
//  SnoreStorm
//
//  Created by dave on 2/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef GraphGenerator_h
#define GraphGenerator_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "JBChartView.h"
#import "JBBarChartView.h"


@interface GraphGenerator: UIView <JBBarChartViewDelegate, JBBarChartViewDataSource>
{
  JBBarChartView *barChartView;
  NSArray *graphData;
}
//set by javacript
@property(nonatomic,strong) NSArray* dataArray;
@property(nonatomic) NSString *dummy;

- (id) init;

@end

#endif /* GraphGenerator_h */
