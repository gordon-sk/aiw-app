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

	 renderDots() {
	   toReturn = [];
		 for (let x=0; x<global.barCoords.length; x++) {
	 		toReturn.push(
	 			<Image
					source={require('../Pictures/bar.png')}
					style={{
						top: global.barCoords[x].top,
						left: global.barCoords[x].left,
						position: 'absolute',
					}}
					key={x}
				/>
			);
		}
		return toReturn;
	}


	render() {
		return(
			<View style={styles.container}>
				{this.renderDots()}
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
