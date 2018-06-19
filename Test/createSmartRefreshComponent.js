import React, {Component} from 'react';
import {StyleSheet, View, Text,Animated} from 'react-native';
import PropTypes from 'prop-types';

const createSmartRefreshComponent = (WrappedComponent) => {
    return class SmartRefreshComponent extends Component {
        static propTypes = {
            refreshControl: PropTypes.element,
        }
        __lastListY=new Animated.Value(0)

        _onScroll=(event)=>{
            let {onScroll} = this.props;
            onScroll && onScroll(event);
            this.__lastListY.setValue(event.nativeEvent.contentOffset.y);
        }
        render() {
            let {refreshControl:RefreshControl,...props} = this.props;
            if (RefreshControl &&
                React.isValidElement(RefreshControl)) {
               return React.cloneElement(
                   RefreshControl,{
                       __lastListY:this.__lastListY,
                       __wrapperName:WrappedComponent.displayName
                   },
                   <WrappedComponent {...props} onScroll={this._onScroll}/>)
            }
            return <WrappedComponent {...this.props}/>
        }
    }
}
export default createSmartRefreshComponent;