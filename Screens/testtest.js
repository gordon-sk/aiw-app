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
import { FormInput} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export class TestingEnv extends React.Component {
	render() {
		return(
			<View>
			<FormInput
placeholder='BASIC FormInput'
/>

<FormInput
placeholder='FormInput WITH ICON'
leftIcon={
	<Icon
		name='user'
		size={24}
		color='black'
	/>
}
/>

<FormInput
placeholder='FormInput WITH SHAKING EFFECT'
shake={true}
/>

<FormInput
placeholder='FormInput WITH ERROR MESSAGE'
errorStyle={{ color: 'red' }}
errorMessage='ENTER A VALID ERROR HERE'
/>
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
});
