//
//  RCTPlayerManager.m
//  RCTPlayer
//
//  Created by Zs Guo on 2018/4/1.
//  Copyright © 2018年 sutsoft. All rights reserved.
//

#import "RCTPlayerManager.h"
#import "RCTPlayer.h"
#import <React/RCTBridge.h>

@implementation RCTPlayerManager
RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
    return [[RCTPlayer alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

- (NSArray *)customDirectEventTypes
{
    return @[
             @"onLoading",
             @"onPaused",
             @"onShutdown",
             @"onError",
             @"onPlaying",
             @"onVideoFrameRendering"
             ];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(started, BOOL);
RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);

RCT_EXPORT_VIEW_PROPERTY(onLoading, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPlaying, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onPaused, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onShutdown, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onVideoFrameRendering, RCTBubblingEventBlock);

@end
