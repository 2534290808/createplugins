import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    PanResponder,
    Easing,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
const RefreshState = {
    PULL_DOWN_TO_REFRESH: 'PullDownToRefresh',//下拉开始刷新
    REFRESHING: 'Refreshing',//正在刷新
    RELEASE_TO_REFRESH: "ReleaseToRefresh",//释放刷新
    DONE: "DONE"//完成
}
class SmartRefreshControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshState:RefreshState.DONE,//刷新状态
            translateY:new Animated.Value(-props.headerHeight),//组件初始唯一
            headerHeight:props.headerHeight,//刷新视图view的高度
            scrollEnabled:true,//当children为ListView/FlatList/SectionList/ScrollView时有效
        }
        //创建手势相应者
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: this.onPanResponderRelease,
            onShouldBlockNativeResponder: () => false
        });

    }
    componentDidMount(){
        this.props.__lastListY.addListener((event)=>{
            this.lastListY = event.value;
            this.lastListY <= 0 && this._list && this._list.setNativeProps({
                onMoveShouldSetResponder:()=> false
            })
            this.lastListY<0 && this._list && this._list.forceUpdate()
            console.log(event);
        })
    }
    lastListY:0
    //完成刷新
    finishRefresh=()=>{
        this.resetAni();
    }
    //重置整体动画
    resetAni = () => {
        this.resetList();
        Animated.timing(this.state.translateY, {
            toValue: -this.state.headerHeight,
            // toValue: this.defaultXY,
            easing: Easing.linear,
            duration: 197,
            useNativeDriver: true,
        }).start();
        this._list && this._list.setNativeProps({
            onMoveShouldSetResponder:()=>true
        });
        this.setState({
            pullState: RefreshState.DONE
        })
    }
    //重置刷新时的位置
    resetRefreshAni = () => {
        this.resetList();
        Animated.timing(this.state.translateY, {
            toValue: 0,
            // toValue: {x:0,y:0},
            easing: Easing.linear,
            duration: 197,
            useNativeDriver: true,
        }).start();
    }

    resetList=()=>{
        let {__wrapperName} = this.props;
        if(this._list) {
            if(__wrapperName === 'FlatList') {
                this._list.scrollToOffset({y:0})
            }
            if(__wrapperName === 'ScrollView' ||
               __wrapperName === 'ListView') {
                this._list.scrollTo({y:0})
            }

        }
    }

    render() {
        return (
            <Animated.View style={{
                transform:[{
                    translateY:this.state.translateY
                }]
            }}>
                <View style={{height:this.state.headerHeight}}>
                    {this.props.HeaderComponent}
                </View>
                <View {...this._panResponder.panHandlers}>
                    {React.isValidElement(this.props.children) &&
                     React.cloneElement(
                        this.props.children,
                        {
                            ref:_ref=>this._list = _ref,
                        }
                    )}
                </View>
            </Animated.View>
        )
    }

    onMoveShouldSetPanResponder = (evt, gestureState) => {
        let {dy} = gestureState;
        let bool;
        if (dy < 0) {//向上移动
            if (this.state.pullState != RefreshState.DONE) {
                this.resetAni();
            }
            this._list && this._list.setNativeProps({
                onMoveShouldSetResponder:()=>true,
            })
            bool = false;
        } else {
            if (this.state.pullState != RefreshState.DONE) {
                bool = true;
            } else {
                bool = !this.state.scrollEnabled || this.lastListY < 1;
            }
        }
        return bool;
    }
    onPanResponderMove = (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        const {dy} = gestureState
        if (dy < 0) {//向上滑
            this.resetList()
            this._list && this._list.setNativeProps({
                onMoveShouldSetResponder:()=>true,
            })
            this.resetAni();

        } else {//向下拉
            let pullDis = dy / 2;
            //释放刷新距离，为header高度的两倍
            let pullOkH = this.state.headerHeight * 2;
            let aniY = pullDis - this.state.headerHeight;
            this.state.translateY.setValue(aniY);
            if (pullDis > pullOkH) {
                this.setState({pullState: RefreshState.RELEASE_TO_REFRESH})
            } else if (pullDis > 0) {
                this.setState({pullState: RefreshState.PULL_DOWN_TO_REFRESH})
            }
        }
    }

    onPanResponderRelease = () => {
        let {onRefresh} = this.props;
        switch (this.state.pullState) {
            case RefreshState.PULL_DOWN_TO_REFRESH:
                this.resetAni();
                this._list && this._list.setNativeProps({
                    onMoveShouldSetResponder:()=>true
                })
                break;
            case RefreshState.RELEASE_TO_REFRESH:
                this.resetRefreshAni();
                this.setState({pullState: RefreshState.REFRESHING});
                this._list && this._list.setNativeProps({
                    onMoveShouldSetResponder:()=>true,
                })
                onRefresh && onRefresh();
                break;
        }
    }
}
SmartRefreshControl.propTypes = {
    headerHeight:PropTypes.number,//刷新头部高度
    HeaderComponent:PropTypes.element,//下拉刷新头部组件
}
SmartRefreshControl.defaultProps = {
    headerHeight:60
}
export default SmartRefreshControl;