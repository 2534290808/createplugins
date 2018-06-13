import React, {Component} from 'react';
import {StyleSheet, View, Text,Animated,Easing,Button} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native'

export default class LottieExample extends Component {
    state={
        progress:new Animated.Value(0)
    }
    componentDidMount(){
       this.startAni();
    }
    startAni=()=>{
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver:true,
        }).start();
    }
    render() {
        return (
            <View>
            <LottieView
                ref={ref=>this._lottie=ref}
                style={{height:200}}
                source={require('./img/watermelon')}
                progress={this.state.progress}
                loop
            />
                <Text>数据加载中</Text>
            </View>
            )
    }
}