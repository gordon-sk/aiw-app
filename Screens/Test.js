import React from 'react';
import {
	View,
	Image,
	Easing,
	PanResponder,
	Dimensions,
	StyleSheet,
	Platform,
} from 'react-native';
import { acc_helper } from '../Components and Helpers/acc_helper';

export class Test extends React.Component {

	state = {
		bar_space: 9999,
		circle_space: 9999,
		rotation_scale: 360 / Dimensions.get('window').width,
		screenX: Dimensions.get('window').width,
		screenY: Dimensions.get('window').height,

		random_rot_addition: Math.random() * 360,
		n: null,
		targetIndex: null,
		indexes: null,

		count: this.props.navigation.state.params.count + 1,
		maxCount: this.props.navigation.state.params.maxCount,
		scores: this.props.navigation.state.params.scores,
		test_name: this.props.navigation.state.params.test_name,

		done_waiting: false,

		targetTop: null,
		targetLeft: null,
		target_bar_rotation: null,

		user_rotation: 0,
		tapped: false,
	}

	componentWillMount() {
		setTimeout(() => {this.setState({done_waiting: true})}, 3200);
		var n = this.props.navigation.state.params.n;
		// in the real test, every 11th screen is a one-bar screen
		if (this.props.navigation.state.params.test_name == "Test") {
			if (((this.props.navigation.state.params.count + 1) / 11)%1 == 0) {
		 		n = 1;
		 	}
		}
		var targetIndex = Math.floor(Math.random() * global.barCoords.length);
		global.barCoords[targetIndex].rot = Math.random() * 360;
		var indexes = [targetIndex];
		while (indexes.length < n) {
			var index = Math.floor(Math.random() * global.barCoords.length);
			if (!indexes.includes(index)) {
				indexes.push(index);
				global.barCoords[index].rot = Math.random() * 360;

			}
		}
		this.setState({
			n: n,
			targetIndex: targetIndex,
			targetLeft: global.barCoords[targetIndex].left,
			targetTop: global.barCoords[targetIndex].top,
			target_bar_rotation: global.barCoords[targetIndex].rot,
			indexes: indexes,
			user_rotation: this.state.random_rot_addition,
		});

		// assigning constant coordinate values to junk bars
		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			onPanResponderReject: (evt, gestureState) => {},
			onPanResponderGrant: (evt, gestureState) => {
				// The gesture has started.
				this.setState({lastTouch_t0: evt.nativeEvent.timestamp});
			},
			onPanResponderMove: (evt, gestureState) => {
				// The most recent move distance is gestureState.move{X,Y}
				// The accumulated gesture distance since becoming responder is
				// gestureState.d{x,y}
				var dT = evt.nativeEvent.timestamp - this.state.lastTouch_t0;
				if (dT > 100) {
					var x = evt.nativeEvent.pageX - this.state.screenX / 2;
					var y = evt.nativeEvent.pageY - this.state.screenY / 2;
					var theta = Math.atan2(y, x) * 180 / 3.14159265;
					if (this.state.done_waiting && !this.state.tapped) {
						this.setState({user_rotation: theta + this.state.random_rot_addition});
					}
				}
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				// The user has released all touches while this view is the
				// responder. This typically means a gesture has succeeded
				var dT = evt.nativeEvent.timestamp - this.state.lastTouch_t0;
				var test_name = this.state.test_name;
				if (dT <= 100 && !this.state.tapped && this.state.done_waiting) {
					this.setState({tapped: true});
					this.state.scores.push(this.record());
					setTimeout(() => {}, 1000);
					if (this.state.count == this.state.maxCount) {
						this.props.navigation.navigate(test_name+'_Conclusion', {scores: this.state.scores});
					}
					else {
						this.props.navigation.navigate('Test', {
							n: this.state.n,
							count: this.state.count,
							maxCount: this.state.maxCount,
							scores: this.state.scores,
							test_name: this.state.test_name,
						});
					}
				}
			},

			onPanResponderTerminate: (evt, gestureState) => {},
			onShouldBlockNativeResponder: (evt, gestureState) => {return true;},
		});
	}

	componentDidMount() {
		setTimeout(() => {this.setState({bar_space: 0})}, 1500);
		setTimeout(() => {this.setState({bar_space: 9999})}, 1700);
		setTimeout(() => {this.setState({circle_space: 0})}, 2700);
	}

	record() {
		if (this.state.done_waiting) {
			var score = acc_helper(this.state.target_bar_rotation, this.state.user_rotation);
			var url = 'https://gskiesling.pythonanywhere.com/AIW/default/log_scores?';
			url += 'score=' + String(score) + '&';
			url += 'test_name=' + this.state.test_name + '&';
			url += 'user_ID=' + global.user_ID + '&';
			url += 'test_ID=' + global.test_ID + '&';
			url += 'key=' + global.key;
			global.scores['PT2'].push(score);
			fetch(url)
			  .then((response) => response.text())
			  .then((responseText) => {
				console.log("backend receipt: " + this.state.test_name + ", screen "
				+ this.state.count + ", score " + String(score) + ', :' + responseText);
			  });
			return score;
		}
	}

	renderImages() {
		const bars = [];
		for (let i=0; i < this.state.indexes.length; i++) {
			var tgtString = "_TARGET";
			if (!i == this.state.targetIndex) {tgtString = ''}
			var index = this.state.indexes[i];
			bars.push(
				<View key={"bar_"+i+tgtString}>
					<Image
						source={require('../Pictures/bar.png')}
						style={{
							transform: [{rotate: global.barCoords[index].rot + 'deg'}],
							top: global.barCoords[index].top,
							left: global.barCoords[index].left + this.state.bar_space,
							height: global.barLength,
							width: global.barLength,
							position: 'absolute',
						}}
					/>
				</View>
			);
		}
		bars.push(
				<View key={"circle"}>
					<Image
						source={require('../Pictures/new-circle.png')}
						style={{
							top: this.state.targetTop,
							left: this.state.targetLeft + this.state.circle_space,
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
		var opacity = 0;
		if (this.state.done_waiting) {
			opacity = 1;
		}
		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<View style={{position: 'absolute',
											top: '50%',
											left: '50%',
											opacity: opacity,
											transform: [{translate: [global.centerTranslate,global.centerTranslate]}],
											}}>
					{this.renderUserBar()}
				</View>
				<View style={{
										top: '50%',
										left: '50%',
										transform: [{translate: [global.centerTranslate, global.centerTranslate]}]
						}}>
					<Image
						source={require('../Pictures/newimage.png')}
						style={{height: global.barLength,
										width: global.barLength}}
					/>
				</View>
				<View style={styles.targetBarView}>
					{this.renderImages()}
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
	targetBarView: {
		flex:1,
		position:'absolute',
	},
});
