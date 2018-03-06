package com.lmy.smartrefreshlayout;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.DefaultRefreshFooterCreator;
import com.scwang.smartrefresh.layout.api.DefaultRefreshHeaderCreator;
import com.scwang.smartrefresh.layout.api.RefreshFooter;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.footer.ClassicsFooter;
import com.scwang.smartrefresh.layout.header.ClassicsHeader;
import com.scwang.smartrefresh.layout.listener.OnLoadMoreListener;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by painter.g on 2018/3/6.
 * SmartRefreshLayout插件的封装
 * https://github.com/scwang90/SmartRefreshLayout
 */

public class SmartRefreshLayoutManager extends ViewGroupManager<SmartRefreshLayout>{
    //返回给rn的组件名
    protected static final String REACT_CLASS="SmartRefreshLayout";

    private SmartRefreshLayout smartRefreshLayout;
    private RCTEventEmitter mEventEmitter;

    private static final String COMMAND_FINISH_REFRESH_NAME="finishRefresh";
    private static final int COMMAND_FINISH_REFRESH_ID=0;

    static {
        //设置全局的Header构建器
        SmartRefreshLayout.setDefaultRefreshHeaderCreator(new DefaultRefreshHeaderCreator() {
            @Override
            public RefreshHeader createRefreshHeader(Context context, RefreshLayout layout) {
                //layout.setPrimaryColorsId(R.color.colorPrimary, android.R.color.white);//全局设置主题颜色
                return new ClassicsHeader(context);//.setTimeFormat(new DynamicTimeFormat("更新于 %s"));//指定为经典Header，默认是 贝塞尔雷达Header
            }
        });
        //设置全局的Footer构建器
        SmartRefreshLayout.setDefaultRefreshFooterCreator(new DefaultRefreshFooterCreator() {
            @Override
            public RefreshFooter createRefreshFooter(Context context, RefreshLayout layout) {
                //指定为经典Footer，默认是 BallPulseFooter
                return new ClassicsFooter(context).setDrawableSize(20);
            }
        });
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected SmartRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        smartRefreshLayout=new SmartRefreshLayout(reactContext);
        mEventEmitter=reactContext.getJSModule(RCTEventEmitter.class);
        return smartRefreshLayout;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder builder = MapBuilder.builder();
        for (Events event : Events.values()) {
            builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                COMMAND_FINISH_REFRESH_NAME,COMMAND_FINISH_REFRESH_ID
        );
    }

    @Override
    public void receiveCommand(SmartRefreshLayout root, int commandId, @Nullable ReadableArray args) {
        switch (commandId){
            case COMMAND_FINISH_REFRESH_ID:
                int delayed=args.getInt(0);
                boolean success=args.getBoolean(1);
                if(delayed>0){
                    root.finishRefresh(delayed,success);
                }else{
                    root.finishRefresh(success);
                }
                break;
            default:break;
        }
    }

    /**
     * 设置是否可用
     * @param view
     * @param enabled
     */
    @ReactProp(name = ViewProps.ENABLED, defaultBoolean = true)
    public void setEnabled(SmartRefreshLayout view, boolean enabled) {
        view.setEnabled(enabled);
    }
    @Override
    public void addView(SmartRefreshLayout parent, View child, int index) {
        parent.setRefreshContent(child);
        //super.addView(parent, child, index);
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, SmartRefreshLayout view) {
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {
                //刷新触发
                mEventEmitter.receiveEvent(getTargetId(),Events.REFRESH.toString(),null);
            }
        });
        view.setOnLoadMoreListener(new OnLoadMoreListener() {
            @Override
            public void onLoadMore(@NonNull RefreshLayout refreshLayout) {
                //加载更多触发
                mEventEmitter.receiveEvent(getTargetId(),Events.LOADMORE.toString(),null);

            }
        });
    }
    private int getTargetId(){
        return smartRefreshLayout.getId();
    }
}
