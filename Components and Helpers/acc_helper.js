// takes rotation angle of image and user's chosen angle, both in degrees
// determines percentage accuracy and returns it for display
export function acc_helper(rotation, angle) {
	// first we normalize the angles 
  while (angle > rotation + 180) {
  	angle -= 180;
  }
  while (angle < rotation - 180) {
  	angle += 180;
  }
  // then find the difference, and calculate the score
	var diff = Math.max(rotation, angle) - Math.min(rotation, angle);
	var score = 100 - (diff * 10 / 9);
	// catch it if negative
	if (score < 0) {
		score *= -1;
	}
  return precisionRound(score); // second argument is precision
}

// stolen from mozilla developer docs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function precisionRound(number) {
  var factor = Math.pow(10, 1);
  return Math.round(number * factor) / factor;
}