import React from 'react';
import {
  View,
  Image,
  PanResponder,
  StyleSheet,
  Platform,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { Audio } from 'expo';
import { Icon } from 'react-native-elements'
import { acc_helper } from '../Components and Helpers/acc_helper';
import { theta_calc } from '../Components and Helpers/theta_calc';

export class PT1_Test extends React.Component {

  reset() {
    var new_target_index = Math.floor(Math.random() * global.barCoords.length);
    global.barCoords[new_target_index].rot = Math.random() * 360;
    var count = this.state.count;
    var new_angle = Math.random() * 360;
    this.setState({
      target_bar_rotation: Math.random() * 360,
      target_index: new_target_index,
      bottom_text: null,
      count: count + 1,
      tapped: false,
      done_waiting: false,
      user_rotation: new_angle,
      last_angle: new_angle
    });
    setTimeout(() => {this.setState({done_waiting: true})}, 500);
  }

  componentWillMount() {
    console.log(this.props.navigation.state.params.test_type);
    this.setState({
      done_waiting: false,
      target_index: 0,
      last_angle: 0,
      user_rotation: 0,
      scores: [],
      count: 0,
      give_feedback: this.props.navigation.state.params.give_feedback,
    });

    this._panResponder = PanResponder.create({

			// boring, procedural code
			// Did I copy and paste this from the react-native docs? Maybe.
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
			onMoveShouldSetPanResponder: (evt, gestureState) => false,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
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
				// we won't execute any calculations until the touch is longer
				// than just a tap
				if (!this.state.tapped) {
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
				// We record the last angle the user touched at.
				// This keeps future movements smooth and prevents the bar
				// from jumping around.
				this.setState({last_angle: this.state.user_rotation });
			},
			onPanResponderTerminate: (evt, gestureState) => {},
			onShouldBlockNativeResponder: (evt, gestureState) => {return true;},
		});
  }

  componentDidMount() {
    this.reset();
  }

  handleTap() {
    this.setState({tapped: true});
    this.handleScoring();
    setTimeout(() => this.nav_or_reset(), 1000);
  }

  nav_or_reset() {
    if (this.state.count == 5) {
      this.props.navigation.navigate(
        'PT1_Conclusion',
        {scores: this.state.scores}
      );
    }
    else {
      this.reset();
    }
  }

  handleScoring() {
    // calculate score
    var score = acc_helper(
      global.barCoords[this.state.target_index].rot,
      this.state.user_rotation
    );
    // record the score both on the backend and internally
    this.record(score);
    this.state.scores.push(score);
    // determine whether or not to play sound
    if (score >= 90 && this.state.give_feedback) {
      this.handlePlaySoundAsync();
    }
    this.setState({
      bottom_text: 'Accuracy ' + score + "% (average must be at least 95%)",
    });
  }

  handlePlaySoundAsync = async () => {
    await Audio.setIsEnabledAsync(true);
    let sound = new Audio.Sound();
    await sound.loadAsync(require('../assets/success.wav'));
    await sound.playAsync();
  };


  record = (score) => {
		var url = 'https://filtergraph.com/aiw/default/log_scores?';
	  url += 'score=' + String(score)  + '&';
	  url += 'test_name=PT1&'
	  url += 'user_ID=' + global.user_ID + '&';
	  url += 'test_ID=' + global.test_ID + '&'
	  url += 'key=' + global.key;
		return fetch(url)
		  .then((response) => response.text())
		  .then((responseText) => {
			console.log("backend receipt, PT1, screen " +
				String(this.props.navigation.state.params.count + 1) + ", score " +
				String(score) + ": " + responseText);
		})
    .catch((error) => {
      console.error(error);
      Alert("Something went wrong. Please check your connection.");
    });
  }

  renderUserBar() {
    var icon = this.props.navigation.state.params.test_type == 'bars'
      ? require('../Pictures/bar.png')
      : require('../Pictures/grating.png');
    return(
			<View>
				<Image
					source={icon}
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

  renderTargetBar() {
    var icon = this.props.navigation.state.params.test_type == 'bars'
      ? require('../Pictures/bar.png')
      : require('../Pictures/grating.png');
    return(
		 <View>
			<Image
				source={icon}
				style = {{
					transform: [
            {rotate: global.barCoords[this.state.target_index].rot + 'deg'}
          ],
					top: global.barCoords[this.state.target_index].top,
					left: global.barCoords[this.state.target_index].left,
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
			     {this.state.bottom_text}
		    </Text>
	  </View>
	 );
  }

  renderPushIcon() {
    return(
      <View>
        <Icon
          reverse
          name='arrow-forward'
          type='materialicon'
          onPress={() => this.handleTap()}
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
        <View style={{
                opacity: opacity,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{translate: [global.centerTranslate, global.centerTranslate]}],
        }}>
          {this.renderUserBar()}
        </View>
        <View style={styles.scoreView}>
          {this.renderScore()}
        </View>
        <View style={{flex: 1, position: 'absolute'}}>
          {this.renderTargetBar()}
        </View>
        <View style={styles.instructions}>
          <Text style={{marginBottom: 7}}>
            {this.state.count == 1 && !this.state.tapped ? 'Use finger to make bars parallel, then tap the button' : null }
          </Text>
          {!this.state.tapped ? this.renderPushIcon() : null}
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
  instructions: {
    flex: 1,
    alignItems: 'center',
    top: '80%',
  },
  button: {
    width: '80%'
  },
});
