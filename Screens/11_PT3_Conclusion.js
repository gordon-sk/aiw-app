import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

export class PT3_Conclusion extends Component {

	state = {
			average: null,
	}

	// quick and dirty function that lets us sum the scores
	add = (a, b) => {
			return a + b;
	}
	precisionRound(number) {
  	var factor = Math.pow(10, 1);
  	return Math.round(number * factor) / factor;
	}

	componentWillMount() {
		var scores = this.props.navigation.state.params.scores;
		var average = scores.reduce(this.add, 0) / 10;
		this.setState({average: this.precisionRound(average)});
		this._panResponder = PanResponder.create({
		  // Ask to be the responder:
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
		  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onMoveShouldSetPanResponder: (evt, gestureState) => true,
		  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onPanResponderTerminationRequest: (evt, gestureState) => true,
		  onShouldBlockNativeResponder: (evt, gestureState) => true,
		  onPanResponderRelease: (evt, gestureState) => {
				this.props.navigation.navigate('Test_Instructions');
			}
		});
	}

	render() {
		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Text style={styles.headerText}>
					Awesome!
				</Text>
				<Text style={styles.instructionText}>
					Average Accuracy: {this.state.average} percent
				</Text>
				<Text style={styles.instructionText}>
					You may now move on to the next test.
				</Text>
				<View style={styles.inbetween}/>
				<Text style={styles.instructionText}>
					Tap anywhere to continue.
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#808080',
		flex: 1,
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
	},
	instructionText: {
		fontSize: 15,
		textAlign: 'center',
		padding: 5,
	},
	inbetween: {
		marginVertical: 15,
	}
});
