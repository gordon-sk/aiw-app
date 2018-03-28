import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

export class Test_Conclusion extends Component {

	state = {
			average: null,
			pass: true,
	}

	// quick and dirty function that lets us sum the scores
	add = (a, b) => {
			return a + b;
	}

	componentWillMount() {
		var scores = this.props.navigation.state.params.scores
		var average = scores.reduce(this.add, 0) / 10;
		this.setState({average: average});
		this._panResponder = PanResponder.create({
		  // Ask to be the responder:
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
		  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onMoveShouldSetPanResponder: (evt, gestureState) => true,
		  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onPanResponderTerminationRequest: (evt, gestureState) => true,
		  onShouldBlockNativeResponder: (evt, gestureState) => true,
		  onPanResponderRelease: (evt, gestureState) => {
				this.props.navigation.navigate('Questionnaire');
			}
		});
	}

	render() {
		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Text>
					Average Accuracy: {this.state.average} percent
				</Text>
				<Text>
					Tap anywhere to continue
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	 container: {
	  flex: 1,
	  backgroundColor: '#808080',
	  marginTop: 20,
	},
});
