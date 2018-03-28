import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';

export class Previous_Results extends React.Component {

	state = {
		dates: null,
		backend_received: false,
	}

	componentWillMount() {
		this.fetchTests();
	}

	fetchTests() {
		var url = 'https://gskiesling.pythonanywhere.com/AIW/default/test_list?';
    url += 'user_ID=' + global.user_ID + '&';
    url += 'key=' + global.key;
    fetch(url)
      .then((response) => response.text())
			.then(() => this.setState({backend_received: true}))
      .then((responseText) => {
				if (responseText == 'invalid key passed') {
					console.log('test list receipt:', responseText);
				}
				else if (responseText.slice(0, 1) != '['){
        	console.log('something went wrong on the backend.', responseText);
				}
				else {
					console.log('test list received.');
					test_list = responseText.slice(1, responseText.length - 1).split(',');
					console.log(test_list)
					this.setState({dates: test_list});
				}
      });
	}

	renderButtons() {
		button_list = [];
		for (let x=0; x<this.state.dates.length; x++) {
			date = this.state.dates[x];

			button_list.push(
				<Button
					raised
					backgroundColor='#CCC'
					color='black'
					style={styles.button}
					onPress={() => this.handleLogOut()}
					title='a test'
				/>
			);

		}
	return button_list;
	}

	render() {
		if (this.state.backend_received) {
			if (this.state.dates==null) {
				return(
					<View style={{top: 75}}>
						<Text>
							No worries! Take a few tests and your
							 results will appear here.
						</Text>
					</View>
				);
			}
			else {
				return(
					<View style={styles.container}>
						{this.renderButtons()}
					</View>
				);
			}
		}
		else {
			return(
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			backgroundColor: '#808080',
			marginTop: 20,
		},
	button: {
		marginVertical: 15,
	}
});
