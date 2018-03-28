import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';

export class Test_Instructions extends Component {
  handlePress() {
		this.props.navigation.navigate('Test', {
			n: 6,
			count: 0,
			maxCount: 106,
			scores:[],
			test_name: "Test",
		});
  }

	render() {
		return (
			<View style={styles.container}>
				<View>
				 <Text style={styles.headerText}>Actual Test: Memory for 6 items</Text>
				</View>
				<View>
				</View>
				<View style={{width: Dimensions.get('window').width * .9}}>
					<Text style={styles.instructionText}>
						This is the actual experiment. Do the best you can!
					</Text>
					<Text style={styles.instructionText}>
						You will receive a total of 106 trials, which should take about
						12 minutes.
					</Text>
				</View>
				<View style={styles.inbetween}></View>
				<Text style={styles.headerText}>Reminder:</Text>
				<View style={{width: Dimensions.get('window').width * .9}}>
					<Text style={styles.instructionText}>
						Try to remember as many items as possible, and respond as accurately
						as possible.
					</Text>
					<Text style={styles.instructionText}>
						Keep your eyes on the central dot while doing this task.
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
						title='Start Actual Test: 6 Item Memory'
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
	inbetween: {
		marginVertical: 15,
	}
});
