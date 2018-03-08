import {
    View,
    BackHandler,
    ViewPropTypes as RNViewPropTypes,
    BackAndroid as DeprecatedBackAndroid,
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
export {ViewPropTypes}