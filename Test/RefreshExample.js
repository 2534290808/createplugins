import React, {Component} from 'react';
import {
    StyleSheet,
    View, Text, ScrollView, ToastAndroid, Button, WebView,
    TouchableNativeFeedback,NativeModules,FlatList,
    ActivityIndicator, ImageBackground, Image, Easing, Animated,RefreshControl
} from 'react-native';

import createRefreshList from './createRefreshList';
import createSmartRefreshComponent from './createSmartRefreshComponent';
import SmartRefreshControl from '../SmartRefreshControl';
const ScrollView1 = createSmartRefreshComponent(ScrollView)
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default class RefreshExample extends Component {
    state={
        progress:new Animated.Value(0.5),
        text:'下拉刷新数据',
        translateY:new Animated.Value(-100),
        percent:new Animated.Value(0)
    }
    componentDidMount(){
        //this.startAni();
    }
    startAni=()=>{
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver:true,
        }).start();
    }
    _scroll=(event)=>{
        this.state.translateY.setValue(event.nativeEvent.contentOffset.y)
    }

    render() {
        return (

            <ScrollView
                refreshControl={
                    <SmartRefreshControl
                        onPullDownToRefresh={()=>{
                            console.log('onPullDownToRefresh'+((new Date()).Format("yyyy-MM-dd hh:mm:ss.S")))
                        }}
                        onRefresh={()=>{
                            console.log('onRefresh'+((new Date()).Format("yyyy-MM-dd hh:mm:ss.S")))
                        }}
                        onWillRefresh={()=>{
                            console.log('onWillRefresh'+((new Date()).Format("yyyy-MM-dd hh:mm:ss.S")))
                        }}
                        onReleaseToRefresh={()=>{
                            console.log("onReleaseToRefresh"+((new Date()).Format("yyyy-MM-dd hh:mm:ss.S")))
                        }}
                        headerHeight={60}
                        HeaderComponent={
                            <View style={{height:60,backgroundColor:'red'}}/>
                        }
                    />
                }
            >
                {[1,2,3,4,5,6,7,8,9,10].map((item,index)=>
                    <View key={index} style={{backgroundColor:'white',height:200}}><Text>Item</Text></View>
                )}
            </ScrollView>
        )
    }
}