import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import { logoSize } from '../Components and Helpers/ImageSizing';

export class PT2_Instructions extends Component {
	state = {
		dims: logoSize(1988, 535)
	}
  handlePress() {
		this.props.navigation.navigate('Test', {
			test_name: 'PT2',
		});
  }

	render() {
		return (
			<View style={styles.container}>
				<View>
				 <Text style={styles.headerText}>Practice: Memory for 2 items</Text>
				</View>
				<View>
					<Text style={styles.instructionText}>

					</Text>
				</View>
				<View>
					<Image
						source={require('../Pictures/memory_for_2items.png')}
						style={{width: this.state.dims.width,
									  height: this.state.dims.height}}
					/>
				</View>
				<View style={{width: Dimensions.get('window').width * .9}}>
					<Text style={styles.instructionText}>
						Please keep your eyes focused on the central dot throughout each
						trial, which should take about 4-6 seconds.
					</Text>
					<Text style={styles.instructionText}>
						2 lines will briefly appear in the periphery, too briefly to look
						at directly, so you will do best if you keep your eyes on the
						central dot.
					</Text>
					<Text style={styles.instructionText}>
						After a short delay, a circle will appear at one of the line
						locations. Report the angle of that line from memory by adjusting
						the angle of the central line.
					</Text>
					<Text style={styles.instructionTextBold}>
						Be as accurate as you can, and take your time to respond accurately.
					</Text>
					<Text style={styles.instructionText}>
						To pass this test, your average accuracy should be above
						<Text> </Text>
						<Text style={{backgroundColor: '#ffff00'}}>80%!</Text>
					</Text>
				</View>

				<View style={{flexDirection: 'row', marginHorizontal: 25}}>
					<View style={styles.inbetween}></View>
					<Button
						raised
						backgroundColor='#CCC'
						color='black'
						iconRight={{name: 'arrow-right', type: 'feather'}}
						onPress={() => this.handlePress()}
						title='Start Practice: Memory for 2 items'
					/>
				</View>
			</View>

		)
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
	scrollContainer: {
		alignItems: 'center',
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
	instructionTextBold: {
		padding: 5,
		fontSize: 15,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	instructionsImage: {
		maxWidth: 337 //Dimensions.get('window').width,
	},
	inbetween: {
		marginVertical: 15,
	}
});
