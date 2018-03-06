import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    requireNativeComponent,
    ViewPropTypes,
    findNodeHandle,
    UIManager,
} from 'react-native';
import PropTypes from 'prop-types';

const SmartRefreshLayout = requireNativeComponent('SmartRefreshLayout', SmartRefreshControl);

class SmartRefreshControl extends Component {


    /**
     * 参数格式为{delayed:number,success:bool}
     * delayed:延迟刷新
     * success:是否刷新成功
     * @param params
     */
    finishRefresh=({delayed=-1,success=true}={delayed:-1,success:true})=>{
        this.dispatchCommand('finishRefresh',[delayed,success])
    }
    dispatchCommand=(commandName, params)=>{
        UIManager.dispatchViewManagerCommand(this.findNode(), UIManager.SmartRefreshLayout.Commands[commandName], params);
    }
    findNode=()=>{

        return findNodeHandle(this.refs.refreshLayout);
    }
    render() {
        return (
            <SmartRefreshLayout
                ref="refreshLayout"
                {...this.props}
            />
        )
    }
}

SmartRefreshControl.propTypes = {
    onRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    enabled: PropTypes.bool,
    ...ViewPropTypes,
}
export default SmartRefreshControl;