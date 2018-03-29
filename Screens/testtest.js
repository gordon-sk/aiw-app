import React from 'react';
import {
	View,
	Image,
	StyleSheet,
} from 'react-native';


// THIS FILE
// is currently unused.
// Sometimes I put a button on the frontpage that leads to it when
// I want to see something rendered.
// Think of it as a test environment



export class TestingEnv extends React.Component {

	handleLogOut = () => {
		var url = 'https://gskiesling.pythonanywhere.com/AIW/default/test_method?';
		fetch(url)
			.then(responseData => {
				console.log(responseData);
			})

		this.props.navigation.navigate('Home');
	}

	render() {
		return(
			<View style={styles.container}>
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
});
