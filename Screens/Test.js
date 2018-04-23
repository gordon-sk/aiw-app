import React from 'react';
import {
	View,
	Image,
	Easing,
	PanResponder,
	Dimensions,
	StyleSheet,
	Platform,
	Text,
	Alert
} from 'react-native';
import { acc_helper } from '../Components and Helpers/acc_helper';
import { theta_calc } from '../Components and Helpers/theta_calc';

export class Test extends React.Component {

	reset() {
		var count = this.state.count + 1;
		this.setState({
			done_waiting: false,
			tapped: false,
			circle_space: 9999,
		})
		if (this.state.test_name == 'Test') {
			if (((count + 1) / 11)%1 == 0) {
				this.setState({n: 1});
			}
			else {
				this.setState({n: 6});
			}
		}
		// choosing a target index at random
		var targetIndex = Math.floor(Math.random() * 6);
		// resetting its rotation to a new random value
		global.barCoords[targetIndex].rot = Math.random() * 360;
		var indexes = [targetIndex];
		while (indexes.length < this.state.n) {
			var index = Math.floor(Math.random() * 6);
			if (!indexes.includes(index)) {
				indexes.push(index);
				global.barCoords[index].rot = Math.random() * 360;
			}
		}
		var new_angle = Math.random() * 360;
		this.setState({
			target_index: targetIndex,
			indexes: indexes,
			count: count,
			user_rotation: new_angle,
      last_angle: new_angle
		});

		// doing the timing
		// setTimeout(() => {func}, t);   is the correct syntax
		setTimeout(() => {this.setState({done_waiting: true})}, 3500);
		setTimeout(() => {this.setState({bar_space: 0})}, 1500);
		setTimeout(() => {this.setState({bar_space: 9999})}, 1700);
		setTimeout(() => {this.setState({circle_space: 0})}, 2700);
	}

	componentWillMount() {

		var test_name = this.props.navigation.state.params.test_name;
		var n = 6;
		var count = 0;
		var max_count = 0;
		if (test_name == 'PT2') {
			n = 2;
			max_count = 5;
		}
		else if (test_name == 'PT3') {
			max_count = 10;
		}
		else if (test_name == 'Test') {
			max_count = 106;
		}

		this.setState({
			test_name: test_name,
			n: n,
			count: count,
			max_count: max_count,
			last_angle: 0,
			done_waiting: false,
			tapped: false,
			user_rotation: Math.random()*360,
			target_index: 0,
			indexes: [],
			scores: [],
			bar_space: 9999,
			circle_space: 9999,
		});

		this._panResponder = PanResponder.create({

			// boring, procedural code
			// Did I copy and paste this from the react-native docs? Maybe.
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderReject: (evt, gestureState) => {},

			// The good stuff
			onPanResponderGrant: (evt, gestureState) => {
				// The gesture has started.
				// recording time and the angle the user starts his touch at
				this.setState({
					this_touch_t0: evt.nativeEvent.timestamp,
					this_touch_theta0: theta_calc(evt.nativeEvent),
				});
		  },
			onPanResponderMove: (evt, gestureState) => {
				// the user is moving his finger
				var dT = evt.nativeEvent.timestamp - this.state.this_touch_t0;
				// we won't execute any calculations until the touch is longer
				// than just a tap
				if (dT > 100 && !this.state.tapped) {
					var theta = theta_calc(evt.nativeEvent);
					var dTheta = theta - this.state.this_touch_theta0;
					if (this.state.done_waiting && !this.state.tapped) {
						this.setState({user_rotation: this.state.last_angle + dTheta});
					}
				}
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				// Touch is finished -- user has lifted his hand.
				// First we record the last angle the user touched at.
				// This keeps future movements smooth and prevents the bar
				// from jumping around.
				this.setState({last_angle: this.state.user_rotation });
				// Time calculation...
				var dT = evt.nativeEvent.timestamp - this.state.this_touch_t0;
				// if it WAS a tap, the user hasn't tapped before, and
				// the waiting period for the bar is over:
				if (dT <= 100 && !this.state.tapped && this.state.done_waiting) {
					this.setState({tapped: true});
					this.state.scores.push(this.record(this.state.count));
					setTimeout(() => {}, 1000);
					if (this.state.count == this.state.max_count) {
						this.props.navigation.navigate(test_name+'_Conclusion', {scores: this.state.scores});
					}
					else {
						this.reset();
					}
				}
			},

			onPanResponderTerminate: (evt, gestureState) => {},
			onShouldBlockNativeResponder: (evt, gestureState) => {return true;},
		});
	}

	componentDidMount() {
		// finally, we call reset for the first time to kick off the test
		this.reset();
	}

	// pushing the score to the backend
	record(count) {
		var score = acc_helper(global.barCoords[this.state.target_index].rot, this.state.user_rotation);
		var url = 'https://filtergraph.com/aiw/default/log_scores?';
		url += 'score=' + String(score) + '&';
		url += 'test_name=' + this.state.test_name + '&';
		url += 'user_ID=' + global.user_ID + '&';
		url += 'test_ID=' + global.test_ID + '&';
		url += 'key=' + global.key;
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				console.log("backend receipt: " + this.state.test_name + ", screen "
				+ String(count) + ", score " + String(score) + ': ' + responseText);
			})
			.catch((error) => {
				console.error(error);
				Alert("Something went wrong. Please check your connection.");
			});
		return score;
	}

	// rendering the bars, and the cirle
	renderImages() {
		const bars = [];
		for (let x=0; x<this.state.indexes.length; x++) {
			bars.push(
				<View key={'bar_'+String(x)}>
					<Image
						source={require('../Pictures/bar.png')}
						style={{
							transform: [{rotate: global.barCoords[this.state.indexes[x]].rot + 'deg'}],
							top: global.barCoords[this.state.indexes[x]].top,
							left: global.barCoords[this.state.indexes[x]].left + this.state.bar_space,
							height: global.barLength,
							width: global.barLength,
							position: 'absolute',
						}}
					/>
				</View>
			);
		}
		bars.push(
			<View key={'circle'}>
				<Image
					source={require('../Pictures/new-circle.png')}
					style={{
						top: global.barCoords[this.state.target_index].top,
						left: global.barCoords[this.state.target_index].left + this.state.circle_space,
						height: global.barLength,
						width: global.barLength,
						position: 'absolute',
					}}
				/>
			</View>
		);
		return bars;
	}

	renderUserBar() {
		return(
			<View>
				<Image
					source={require('../Pictures/bar.png')}
					style={{
						height: global.barLength,
						width: global.barLength,
						transform: [{rotate: this.state.user_rotation + 'deg'}],
					}}
				/>
			</View>
		);
	}

	render() {
		var user_bar_opacity = 0;
		if (this.state.done_waiting) {
			user_bar_opacity = 1;
		}
		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<View style={{position: 'absolute',
											top: '50%',
											left: '50%',
											opacity: user_bar_opacity,
											transform: [{translate: [global.centerTranslate, global.centerTranslate]}],
											}}>
					{this.renderUserBar()}
				</View>
				<View style={{
										top: '50%',
										left: '50%',
										transform: [{translate: [global.centerTranslate, global.centerTranslate]}]
						}}>
					<Image
						source={require('../Pictures/center_circle.png')}
						style={{height: global.barLength,
										width: global.barLength}}
					/>
				</View>
				<View style={styles.imagesView}>
					{this.renderImages()}
				</View>
				<View style={styles.instructions}>
          <Text>
            {
							(this.state.count == 1 && this.state.test_name == 'PT2') ?
							'The circle indicates which bar to emulate' : null}
          </Text>
        </View>
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
	centerCircleView: {
			top: '50%',
			left: '50%',
			transform: [{translate: [global.centerTranslate, global.centerTranslate]}]
		},
	imagesView: {
		flex: 1,
		position:'absolute',
	},
	instructions: {
		position: 'absolute',
		top: '90%',
		left: 0, // I know these are defaulted to 0 anyways
		right: 0, // for some reason removing them uncenters the text
		bottom: 0, // recommend you keep them
		alignItems: 'center',
  },
});
