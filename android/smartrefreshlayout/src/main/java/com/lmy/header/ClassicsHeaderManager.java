package com.lmy.header;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by painter.g on 2018/3/7.
 */

public class ClassicsHeaderManager extends SimpleViewManager<ReactClassicsHeader> {
    @Override
    public String getName() {
        return "RCTClassicsHeader";
    }

    @Override
    protected ReactClassicsHeader createViewInstance(ThemedReactContext reactContext) {
        return new ReactClassicsHeader(reactContext);
    }
}
