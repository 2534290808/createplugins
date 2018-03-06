import React,{Component} from 'react';
import {StyleSheet,View,Text,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import SmartRefreshControl from "../SmartRefreshControl";
export default class RefreshExample extends Component{
  render(){
      return(
          <ScrollView
              style={{flex:1,height:500}}
              refreshControl={<SmartRefreshControl
                  ref={ref=>this.smartRefresh=ref}
                  onRefresh={()=>{
                  //alert(111)
                  }}
                  onLoadMore={()=>{
                      alert(222)
                  }}
              />}
          >
              <View style={{flex:1,backgroundColor:'red',height:500}}>
                  <Text onPress={()=>{
                      this.smartRefresh&&this.smartRefresh.finishRefresh({
                          success:false
                      })
                  }}>refresh</Text>
              </View>
          </ScrollView>
      )
  }
}