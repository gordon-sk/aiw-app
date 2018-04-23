import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';

export class Debrief extends Component {

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.primaryView}>
					<Text style={styles.headerText}>
						Debriefing
					</Text>
					<Text style={styles.instructionText}>
						Thank you for your participation in our study! Your anonymous data
						makes an important contribution to our understanding of human working
						visual memory.
					</Text>
					<Text style={styles.instructionText}>
						If you have any questions about this research, you may contact the
						experimenter:
					</Text>
					<Text style={styles.instructionTextBold}>
						ftonglab@gmail.com
					</Text>
					<Text style={styles.instructionText}>
						To complete this test, simply press the continue button. You will be
						redirected home and may take the test again if you want.
					</Text>
					<Button
							raised
							backgroundColor='#CCC'
							color='black'
							iconRight={{name: 'arrow-right', type: 'feather'}}
							onPress={() => this.props.navigation.navigate('Home')}
							title='Submit'
						/>
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
	  justifyContent: 'center',
		alignItems: 'center'
	},
	primaryView: {
		width: Dimensions.get('window').width*.85
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

});
