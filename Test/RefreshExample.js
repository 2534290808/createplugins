import React,{Component} from 'react';
import {StyleSheet,
    View,Text,ScrollView,ToastAndroid,Button,WebView,
    TouchableNativeFeedback,
    ActivityIndicator,ImageBackground,Image
} from 'react-native';
import PropTypes from 'prop-types';
import SmartRefreshControl from "../SmartRefreshControl";
import StoreHouseHeader from "../StoreHouseHeader";
import ClassicsHeader from "../ClassicsHeader";
import MaterialHeader from "../MaterialHeader";
import AnyHeader from "../AnyHeader";
import DefaultHeader from "../DefaultHeader";
export default class RefreshExample extends Component{
    componentDidMount(){

    }
  render(){
      return(
          <ScrollView
              //style={{flex:1}}
              refreshControl={<SmartRefreshControl pointerEvents="box-none"
                  key="control"
                  style={{flex:1}}
                  HeaderComponent={<StoreHouseHeader/>}
                  ref={ref=>this.smartRefresh=ref}
                  onRefresh={()=>{
                      setTimeout(()=>{
                          this.smartRefresh&&this.smartRefresh.finishRefresh({
                              success:true
                          })
                      },1000)
                      //alert(111)
                  }}
              />}
          >
              <View style={{flex:1,justifyContent:'center',alignItems:'center',
                  backgroundColor:'#CCC'
              }}>
                  <TouchableNativeFeedback onPress={()=>{
                      alert(111)
                  }}>
                      <View style={{height:56,backgroundColor:'green'}}>
                      <Text>TouchableNativeFeedback</Text>
                      </View>
                  </TouchableNativeFeedback>
                  <Text onPress={()=>alert(112)} style={{fontSize:56}}>content</Text>
              </View>
          </ScrollView>


      )
  }
}