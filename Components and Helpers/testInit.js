import { Dimensions, Platform } from 'react-native';

// called when user begins a test,
// in ComponentWillMoutnt() in file 3_ViewingInstructions.js
function testInitialization_old() {
	// sizing down the bars, if the screen is small
	var ScreenX = Dimensions.get('window').width;
  var ScreenY = Dimensions.get('window').height - 20; // to acount for martinTop
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

	// defining array of bar coordinates
	var spacingX = (ScreenX - 3*L) / 4;
	var spacingY = (ScreenY - 5*L) / 6;
  var sidesX = spacingX;
  var sidesY = spacingY;
	if (spacingX > 101) {
		spacingX = 101;
		sidesX = (ScreenX - 3*L - 2*spacingX) / 2;
	}
	if (spacingY > 101) {
		spacingY = 101;
		sidesY = (ScreenY - 5*L - 4*spacingY) / 2;
	}
	//
	var barCoords = [];
	barCoords.push({
		left: sidesX + 1*L + 1*spacingX,
		top: sidesY + 0*L + 0*spacingY,
		rot: null, // this is redefined in each test screen render
	});
	barCoords.push({
		left: sidesX + 0*L + 0*spacingX,
		top: sidesY + 1*L + 1*spacingY,
		rot: null, // this is redefined in each test screen render
	});
	barCoords.push({
		left: sidesX + 2*L + 2*spacingX,
		top: sidesY + 1*L + 1*spacingY,
		rot: null, // this is redefined in each test screen render
	});
	barCoords.push({
		left: sidesX + 0*L + 0*spacingX,
		top: sidesY + 3*L + 3*spacingY,
		rot: null, // this is redefined in each test screen render
	});
	barCoords.push({
		left: sidesX + 2*L + 2*spacingX,
		top: sidesY + 3*L + 3*spacingY,
		rot: null, // this is redefined in each test screen render
	});
	barCoords.push({
		left: sidesX + 1*L + 1*spacingX,
		top: sidesY + 4*L + 4*spacingY,
		rot: null, // this is redefined in each test screen render
	});

	global.barCoords = barCoords;

	// to track scores
	global.scores = {'PT1':[], 'PT2':[], 'PT3':[], 'Test':[]};

}

function testInitialization_exp() {
	// sizing down the bars, if the screen is small
	var ScreenX = Dimensions.get('window').width;
  var ScreenY = Dimensions.get('window').height - 20; // to acount for martinTop
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

}

export function testInitialization() {
	var old = false;
	if (old) {
		testInitialization_old();
	}
	else {
		testInitialization_exp();
	}
}
