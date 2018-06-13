import React, {Component} from 'react';
import {
    StyleSheet,
    View, Text, ScrollView, ToastAndroid, Button, WebView,
    TouchableNativeFeedback,
    ActivityIndicator, ImageBackground, Image, Easing, Animated
} from 'react-native';
import PropTypes from 'prop-types';
import SmartRefreshControl from "../SmartRefreshControl";
import StoreHouseHeader from "../StoreHouseHeader";
import ClassicsHeader from "../ClassicsHeader";
import MaterialHeader from "../MaterialHeader";
import AnyHeader from "../AnyHeader";
import DefaultHeader from "../DefaultHeader";
import createRefreshList from './createRefreshList';
import PullToRefresh from './PullToRefresh'
import LottieExample from "./LottieExample";
const ScrollView1 = createRefreshList(ScrollView)
import LottieView from 'lottie-react-native'
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
    _scroll=(e)=>{
    }

    render() {
        return (
            <Animated.View>
                <Animated.View style={{height:100,backgroundColor:'green',
                    position:'absolute',left:0,right:0,zIndex:10000,
                    transform:[{translateY:this.state.translateY}]}}>
                    <Text>referesh View</Text>
                </Animated.View>
            <ScrollView
                refresh={()=>{}}
                onScroll={this._scroll}
                //style={{flex:1}}
                refreshControl={<SmartRefreshControl pointerEvents="box-none"
                                                     key="control"
                                                     style={{flex: 1}}
                                                     HeaderComponent={
                                                         <AnyHeader>
                                                             <View style={{
                                                                 flexDirection:'row',
                                                                 justifyContent:'center',
                                                                 alignItems:'center',
                                                                 height:100,
                                                                 backgroundColor:'transparent'
                                                             }}>
                                                                <Text>此页面由。。。。提供</Text>
                                                             </View>
                                                         </AnyHeader>
                                                     }
                                                     ref={ref => this.smartRefresh = ref}
                                                     headerHeight={100}
                                                     onHeaderPulling={e=>{
                                                         //console.log(e.nativeEvent)
                                                         //this.state.translateY.setValue(-100+e.nativeEvent.offset)
                                                     }}
                                                     onHeaderReleasing={e=>{
                                                         //this.state.translateY.setValue(-100+e.nativeEvent.offset)
                                                        // console.log(e.nativeEvent)
                                                     }
                                                     }
                                                     onRefresh={() => {
                                                         console.log('-------------')
                                                         setTimeout(() => {
                                                             this.smartRefresh && this.smartRefresh.finishRefresh({
                                                                 success: true
                                                             })
                                                         }, 1000)
                                                         //alert(111)
                                                     }}
                />}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#CCC',
                }}>
                    <View style={{height:1000,backgroundColor:'red',width:100}}/>
                    <Button title='button' onPress={() => alert(111)}/>
                    <TouchableNativeFeedback onPress={() => {
                        alert(111)
                    }}>
                        <View style={{height: 56, backgroundColor: 'green'}}>
                            <Text>TouchableNativeFeedback</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <Text onPress={() => alert(112)} style={{fontSize: 56}}>content</Text>
                </View>
            </ScrollView>
            </Animated.View>

        )
    }
}