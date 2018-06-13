import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text, PanResponder, Animated, Easing,Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
const refreshState={
  PullDownToRefresh:'PullDownToRefresh',//下拉开始刷新
  Refreshing:'Refreshing',//正在刷新
  ReleaseToRefresh:"ReleaseToRefresh",//释放刷新
  Done:'Done',//刷新完成
}
const {height,width} = Dimensions.get('window');
//下拉刷新组件
const createRefreshList = (WrappedComponent) => {
  return class RefreshList extends Component{
    constructor(props){
      super(props);
      this.state={
        //ListView/FlatList是否可以滚动
        scrollEnabled:false,
        //下拉的状态
        pullState:refreshState.Done,
        translateY:new Animated.Value(-props.refreshViewHeight),
        refreshViewHeight:props.refreshViewHeight,//刷新视图View的高度
      }
      //创建手势相应者
      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
        onPanResponderMove: this.onPanResponderMove,
        onPanResponderRelease: this.onPanResponderRelease,
        onPanResponderTerminate: this.onPanResponderRelease,
        onShouldBlockNativeResponder: ()=>false
      });
    }
    static propTypes={
      renderRefreshView:PropTypes.func,
      refreshViewHeight:PropTypes.number,
    }
    static defaultProps={
      refreshViewHeight:100
    }
    componentDidMount(){
      this._list && this._list.setNativeProps({
          scrollEnabled:false
      })
    }
    //记录ListView最后一次滚动停止时的y坐标
    lastListY:0

    //当scroll小于等于0时设置scroll为false
    _scroll=(e)=>{
      this.lastListY = e.nativeEvent.contentOffset.y;
      this.lastListY<=0 && this._list && this._list.setNativeProps({
        scrollEnabled:false
      })
    }

    //重置整体动画
    resetAnimation=()=>{
      this.resetList();
      Animated.timing(this.state.translateY, {
        toValue: -this.state.refreshViewHeight,
        // toValue: this.defaultXY,
        easing: Easing.linear,
        duration: 197,
        useNativeDriver:true,
      }).start();
      this._list && this._list.setNativeProps({
          scrollEnabled:false
      });
      this.setState({
          pullState:refreshState.Done
      })
    }

    //重置位置 refreshView刚好显示的位置
    resetAnimationTop=()=>{
      this.resetList();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        // toValue: {x:0,y:0},
        easing: Easing.linear,
        duration: 197,
          useNativeDriver:true,
      }).start();
    };

    resetList=()=>{
      this._list && this._list.scrollTo({y:0})
    }

    getNode=()=>{
      return this._list
    }

    _renderRefreshView=()=>{
      let {renderRefreshView} = this.props;
      if(renderRefreshView) {
        return renderRefreshView();
      }else{
        return (
            <View style={{height:100,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
              <Text>refresh view</Text>
            </View>
        )
      }
    }
    render(){
      return (
        <Animated.View style={{
          transform:[{
            translateY:this.state.translateY
          }]
        }}>
          <View>
            {this._renderRefreshView()}
          </View>
          <View {...this._panResponder.panHandlers}>
            <WrappedComponent
              {...this.props}
              onScroll={this._scroll}
              ref={ref=>this._list=ref}
            />
          </View>
        </Animated.View>
      )
    }

    onMoveShouldSetPanResponder=(evt, gestureState)=>{
      let {dy} = gestureState;
      let bool;
      if(dy<0){//向上移动
        if(this.state.pullState != refreshState.Done){
          this.resetAnimation();
        }
        this._list && this._list.setNativeProps({
          scrollEnabled:true,
        })
        bool = false;
      }else{
          if(this.state.pullState != refreshState.Done){
              bool=true;
          }else {
              bool=!this.state.scrollEnabled||this.lastListY<1;
          }
          return true;
      }
      return bool;
    }

    onPanResponderMove=(evt,gestureState)=>{
      // 最近一次的移动距离为gestureState.move{X,Y}
      const {dy} = gestureState
      if(dy<0){//向上滑
        this._list && this._list.setNativeProps({
          scrollEnabled:true,
        })
        this.resetAnimation();

      }else {//向下拉
        let pullDis=dy/2;
        let pullOkH=this.state.refreshViewHeight*1.5;
        let aniY=pullDis-this.state.refreshViewHeight;
        this.state.translateY.setValue(aniY);
        if(pullDis>pullOkH){
          this.setState({pullState:refreshState.ReleaseToRefresh})
        }else if(pullDis>0){
          this.setState({pullState:refreshState.PullDownToRefresh})
        }
      }
    }

    onPanResponderRelease=()=>{
      switch (this.state.pullState){
        case refreshState.PullDownToRefresh:
          this.resetAnimation();
          this._list && this._list.setNativeProps({
            scrollEnabled:true
          })
          break;
        case refreshState.ReleaseToRefresh:
          this.resetAnimationTop();
          this.setState({pullState:refreshState.Refreshing});
          this._list && this._list.setNativeProps({
            scrollEnabled:true,
          })
          setTimeout(()=>{
            this.resetAnimation();
            this.setState({
              pullState:refreshState.Done
            })
          },1000)
          break;
      }
    }
  };
}
module.exports = createRefreshList;
