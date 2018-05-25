import { Dimensions, Platform } from 'react-native';

// called when user begins a test,
// in ComponentWillMount() in file 3_ViewingInstructions.js

export function testInitialization() {
	// sizing down the bars, if the screen is small
	var ScreenX = Dimensions.get('window').width;
  var ScreenY = Dimensions.get('window').height;
	if (ScreenX <= 303) {
		var L = ScreenX / 3;
	}
	else {
		var L = 101;
	}
	console.log("Bars will have pixel dimensions: " + String(L)
							+ 'x' + String(L));
	global.barLength = L; // it's a square

	// to shift image to exact center of screen via CSS properties later
	var centerTranslate = -50 * (L / 101);
	global.centerTranslate = centerTranslate;
	if (Platform.OS == 'ios') {
		global.centerTranslate = centerTranslate + "%";
	}
	var barCoords = [];
	var OriginX = Dimensions.get('window').width / 2;
	var OriginY = Dimensions.get('window').height / 2;
	var R = OriginX - 25;
	if (ScreenX > 600) {
		R = 275;
	}
	for (let theta=30; theta<=330; theta+=60) {
		barCoords.push({
	 		top:  (ScreenY/2) - (R * Math.sin(theta * 3.14159265 / 180)) - L/2,
	 		left: (Dimensions.get('window').width/2) - (R * Math.cos(theta * 3.14159265 / 180)) - L/2,
	 		rot:  Math.random() * 360,
	 	});
	}

	global.barCoords = barCoords;
	// to track scores
}
