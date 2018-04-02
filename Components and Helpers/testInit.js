import { Dimensions, Platform } from 'react-native';

// called when user begins a test,
// in ComponentWillMount() in file 3_ViewingInstructions.js

export function testInitialization() {
	// sizing down the bars, if the screen is small
	var ScreenX = Dimensions.get('window').height;
  var ScreenY = Dimensions.get('window').width - 20; // to acount for martinTop
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
	if (ScreenX > 600) {
		ScreenX = 600;
	}
	var R = (ScreenX / 2) - 25;
	for (let theta=30; theta<=330; theta+=60) {
		barCoords.push({
	 		top:  (ScreenY/2) - 50 - R * Math.sin(theta * 3.14159265 / 180),
	 		left: (ScreenX/2) - 50 - R * Math.cos(theta * 3.14159265 / 180),
	 		rot:  null,
	 	});
	}

	global.barCoords = barCoords;

	// to track scores
	global.scores = {'PT1':[], 'PT2':[], 'PT3':[], 'Test':[]};
	console.log(Dimensions.get('window'));
	console.log(barCoords);
}
