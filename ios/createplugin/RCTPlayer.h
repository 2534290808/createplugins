//
//  RCTPlayer.h
//  RCTPlayer
//
//  Created by Zs Guo on 2018/4/1.
//  Copyright © 2018年 sutsoft. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <React/RCTView.h>
#import "PLPlayer.h"

@class RCTEventDispatcher;

@interface RCTPlayer : UIView<PLPlayerDelegate>

@property (nonatomic, assign) int reconnectCount;

@property (nonatomic, copy) RCTBubblingEventBlock onLoading;
@property (nonatomic, copy) RCTBubblingEventBlock onPlaying;
@property (nonatomic, copy) RCTBubblingEventBlock onPaused;
@property (nonatomic, copy) RCTBubblingEventBlock onShutdown;
@property (nonatomic, copy) RCTBubblingEventBlock onError;
@property (nonatomic, copy) RCTBubblingEventBlock onVideoFrameRendering;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;


@end
