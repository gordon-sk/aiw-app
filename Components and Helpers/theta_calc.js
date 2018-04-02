import { Dimensions } from 'react-native';

export function theta_calc(nativeEvent) {
  var dims = Dimensions.get('window');
  var x = nativeEvent.pageX - dims.width / 2;
  var y = nativeEvent.pageY - dims.height / 2;
  var theta = Math.atan2(y, x) * 180 / 3.14159265;
  return theta;
}
