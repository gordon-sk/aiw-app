import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import { color } from '../assets/RGB.js';

export class Color_Test extends React.Component {

  componentWillMount() {
    const colors = color();
    this.setState({
      colors: colors,
      target_circle_size: Dimensions.get('screen').width * .6,
      inset_circle_size: Dimensions.get('screen').width * .5,
    });

  	this._panResponder = PanResponder.create({
  	  // Ask to be the responder:
  	  onStartShouldSetPanResponder: (evt, gestureState) => true,
  		onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  		onMoveShouldSetPanResponder: (evt, gestureState) => true,
  		onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  		onPanResponderTerminationRequest: (evt, gestureState) => true,
  		onShouldBlockNativeResponder: (evt, gestureState) => true,
  		onPanResponderRelease: (evt, gestureState) => {}
  	});
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>{this.state.angle}</Text>
        <View
          style={{
                position: 'absolute',
                width: this.state.target_circle_size,
                height: this.state.target_circle_size,
                borderRadius: this.state.target_circle_size / 2,
                backgroundColor: this.state.circle_color,
                }}
        />
        <View
          style={{
                position: 'absolute',
                width: this.state.inset_circle_size,
                height: this.state.inset_circle_size,
                borderRadius: this.state.inset_circle_size / 2,
                backgroundColor: '#808080'
                }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4'
},
});
