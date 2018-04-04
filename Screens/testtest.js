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

	renderstuff() {
		list = [];
		for (let x=0; x<global.barCoords.length; x++) {
			list.push(
				<View key={'bar_'+String(x)}>
					<Image
						source={require('../Pictures/download.png')}
						style={{
							top: global.barCoords[x].top,
							left: global.barCoords[x].left,
							width: 10,
							height: 10,
							position: 'absolute',
						}}
					/>
				</View>
			);
		}
		return list;
	}

	render() {
		return(
			<View style={styles.container}>
				{this.renderstuff()}
				<Image
					source={require('../Pictures/download.png')}
					style={{
						top: 0,
						left: 0,
						width: 10,
						height: 10,
						position: 'absolute',
					}}
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
