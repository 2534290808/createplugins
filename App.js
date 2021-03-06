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
  View,Dimensions,Button
} from 'react-native';
import Switch from "./Switch";
const {width}=Dimensions.get('window')
import RefreshExample from "./Test/RefreshExample";
import PullRefreshExample from "./Test/PullRefreshExample";
import LottieExample from "./Test/LottieExample";
const AppId = "11065190";
const AppKey = "3l4iQeGS9yqXscBHpc7rhlWn";
const AppSecret = "mfpIymVMu3zok9VKUkTDkbkz9GogW3sO";
type Props = {};
export default class App extends Component<Props> {
  state={
    value:false
  }
  constructor(){
    super();
    //BaiduSpeech.init(AppId,AppKey,AppSecret);
  }
  render() {
    return (
      <RefreshExample
      />
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
