import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';

export class PT3_Instructions extends Component {
  handlePress() {
		this.props.navigation.navigate('Test', {
			test_name: 'PT3',
		});
  }

	render() {
		return (
			<View style={styles.container}>
				<View>
				 <Text style={styles.headerText}>Practice: Memory for 6 items</Text>
				</View>
				<View>
				</View>
				<View style={{width: Dimensions.get('window').width * .9}}>
					<Text style={styles.instructionText}>
						You will have 10 practice trials that match the real test. You will
						be presented with 6 lines to remember. Don't worry if you find this
						more challenging, just do the best you can. Try to remember as many
						items as you can, as precisely as you can.
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
						title='Start Practice: Memory for 6 items'
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
