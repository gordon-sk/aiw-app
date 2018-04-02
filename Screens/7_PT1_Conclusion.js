import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { add, precisionRound } from '../Components and Helpers/scoring_and_rounding';

export class PT1_Conclusion extends Component {

	state = {
			average: null,
			pass: null,
	}

	componentWillMount() {
		var scores = this.props.navigation.state.params.scores
		var average = scores.reduce(add, 0) / 5;
		this.setState({
			pass: (average >= 95),
			average: precisionRound(average)
		});
		console.log('User passed PT1: ' + (average >= 95) +
								" , score: " + average);
		this._panResponder = PanResponder.create({
		  // Ask to be the responder:
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
		  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onMoveShouldSetPanResponder: (evt, gestureState) => true,
		  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onPanResponderTerminationRequest: (evt, gestureState) => true,
		  onShouldBlockNativeResponder: (evt, gestureState) => true,
		  onPanResponderRelease: (evt, gestureState) => {
				if (this.state.pass) {
					this.props.navigation.navigate('PT2_Instructions');
				}
				else {
					this.props.navigation.navigate('PT1_Test', {n: 1, count:0, scores: []});
				}
		  }
		});
	}

	render() {
		if (this.state.pass) {
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
					<Text></Text>
					<Text style={styles.instructionText}>
						Tap anywhere to continue.
					</Text>
				</View>
			);
		}
		else {
			return(
				<View style={styles.container} {...this._panResponder.panHandlers}>
					<Text>
						Average Accuracy: {this.state.average} percent
						(average must be at least 95%)
					</Text>
					<Text>
						Tap anywhere to try again
					</Text>
				</View>
			);
		}
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
