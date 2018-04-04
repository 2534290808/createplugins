/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Dimensions
} from 'react-native';
import Switch from "./Switch";
const {width}=Dimensions.get('window')
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state={
    value:false
  }
  render() {
    return (
      <View style={{flex:1,paddingTop:20}}>
        <Switch value={this.state.value} onValueChange={value=>{
          //alert(value)
          this.setState({
              value
          })
        }} style={{width:51,height:31}}/>
       {/* <Player style={{height:200}}
                source={{
                  uri:'rtmp://live.hkstv.hk.lxdns.com/live/hks',liveStreaming:true}}/>
      </View>*/}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
