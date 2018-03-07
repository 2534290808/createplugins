import React,{Component} from 'react';
import {StyleSheet,View,Text,ScrollView,ToastAndroid,Button,WebView,TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import SmartRefreshControl from "../SmartRefreshControl";
import StoreHouseHeader from "../StoreHouseHeader";
export default class RefreshExample extends Component{
    componentDidMount(){

    }
  render(){
      return(
          <ScrollView
              style={{flex:1}}
              refreshControl={<SmartRefreshControl
                  //headerType={'Classic'}
                  HeaderComponent={<StoreHouseHeader
                      textColor="green"
                      text="1234"
                     // lineWidth={10}
                      //dropWidth={100}
                      //fontSize={100}
                  />}
                  style={{flex:1}}
                  ref={ref=>this.smartRefresh=ref}
                  onRefresh={()=>{
                      setTimeout(()=>{
                          this.smartRefresh&&this.smartRefresh.finishRefresh({
                              success:false
                          })
                      },1000)
                      //alert(111)
                  }}
                  onLoadMore={()=>{
                      //alert(222)
                  }}
              />}
          >
              <Button title="button" onPress={()=>{
                  alert(111)
              }}/>
              <Text>dsfds</Text>
          </ScrollView>


      )
  }
}