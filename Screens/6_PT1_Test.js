import React from 'react';
import {
	View,
	Text,
	Image,
	Animated,
	PanResponder,
	Platform,
	Dimensions,
	StyleSheet,
} from 'react-native';
import {acc_helper} from '../Components and Helpers/acc_helper';

export class PT1_Test extends React.Component {

	state = {
		rotation_scale: 360 / Dimensions.get('window').width,
		random_rot_addition: Math.random() * 360,
		screenX: Dimensions.get('window').width,
		screenY: Dimensions.get('window').height,

		bottomText: 'Tap anywhere to submit.',
		done_waiting: null,

		target_bar_rotation: null,
		barCoords: null,
		targetTop: null,
		targetLeft: null,

		user_rotation: 0,
		tapped: false,
		score: 0,
	}

	componentWillMount() {

  	setTimeout(() => {this.setState({done_waiting: true})}, 500);
		var n = 1;
		var targetIndex = Math.floor(Math.random() * global.barCoords.length);
		this.setState({
			n: n,
			barCoords: global.barCoords,
			targetIndex: targetIndex,
			targetLeft:global.barCoords[targetIndex].left,
			targetTop: global.barCoords[targetIndex].top,
			target_bar_rotation: Math.random()*360,
			user_rotation: this.state.random_rot_addition,
		});

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
		  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		  onMoveShouldSetPanResponder: (evt, gestureState) => true,
		  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

		  onPanResponderGrant: (evt, gestureState) => {
				// The gesture has started. Show visual feedback so the user knows
				// what is happening!
					this.setState({lastTouch_t0: evt.nativeEvent.timestamp});
		  },
			onPanResponderMove: (evt, gestureState) => {
				var dT = evt.nativeEvent.timestamp - this.state.lastTouch_t0;
				var old = true;
				if (dT > 100 && old) {
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
				var count = this.props.navigation.state.params.count + 1;
				var scores = this.props.navigation.state.params.scores;
				if (dT < 130 && !this.state.tapped && this.state.done_waiting) {
					this.setState({tapped: true});
					this.showText();
				}
				else if (dT < 130 && this.state.tapped) {
					scores.push(this.state.score);
					if (count == 5) {
					this.props.navigation.navigate('PT1_Conclusion', {scores: scores});
					}
					else {
						this.props.navigation.navigate('PT1_Test', {count: count, scores: scores});
					}
				}
		  },
		  onShouldBlockNativeResponder: (evt, gestureState) => {
				return true;
		  },
		});
	}

	renderTargetBar() {
		return(
		 <View>
			<Image
				source={require('../Pictures/bar.png')}
				style = {{
					transform: [{rotate: this.state.target_bar_rotation + 'deg'}],
					top: this.state.targetTop,
					left: this.state.targetLeft,
					height: global.barLength,
					width: global.barLength,
				}}
			/>
	  </View>
	 );
	}

	renderUserBar() {
		return(
			<View>
				<Image
					source={require('../Pictures/bar.png')}
					style={{
						transform: [
							{rotate: this.state.user_rotation + 'deg'}
						],
						height: global.barLength,
						width: global.barLength,
					}}
				/>
			</View>
		);
	}

	renderScore() {
		return(
			<View>
				<Text style={{ fontSize: 18, textAlign: 'center'}}>
			{this.state.bottomText}
		</Text>
	  </View>
	 );
	}

	showText = () => {
		if (this.state.done_waiting) {
		  var score = acc_helper(this.state.target_bar_rotation, this.state.user_rotation);
		  this.setState({score: score});
		  this.setState({bottomText: 'Accuracy ' + score +
		  	"% (average must be at least 95%)\n\nTap to continue."});
		  this.setState({tapped: true});
		  this.record(score);
		}
  }

	record = (score) => {
		var url = 'https://gskiesling.pythonanywhere.com/AIW/default/log_scores?';
	  url += 'score=' + String(score)  + '&';
	  url += 'test_name=PT1&'
	  url += 'user_ID=' + global.user_ID + '&';
	  url += 'test_ID=' + global.test_ID + '&'
	  url += 'key=' + global.key;
		global.scores['PT1'].push(score);
		return fetch(url)
		  .then((response) => response.text())
		  .then((responseText) => {
			console.log("backend receipt, PT1, screen " +
				String(this.props.navigation.state.params.count + 1) + ", score " +
				String(score) + ": " + responseText);
		});
  }

	render() {
		var opacity = 0;
		if (this.state.done_waiting) {
			opacity = 1;
		}
		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<View style={{
								opacity: opacity,
								position: 'absolute',
	  						top: '50%',
	  						left: '50%',
	  						transform: [{translate: [global.centerTranslate,global.centerTranslate]}],
	  		}}>
					{this.renderUserBar()}
				</View>
				<View style={styles.scoreView}>
					{this.renderScore()}
				</View>
				<View style={{flex: 1, position: 'absolute'}}>
					{this.renderTargetBar()}
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
  userBarView: {
		position: 'absolute',
	  top: '50%',
	  left: '50%',
		...Platform.select({
		ios: {
			transform: [{translate: ['-50%','-50%']}],
		},
		android: {
			transform: [{translate: [-50,-50]}],
		},
		})
	},
  scoreView: {
		top: '75%',
		alignSelf: 'center',
		zIndex: 2,
  },
});
