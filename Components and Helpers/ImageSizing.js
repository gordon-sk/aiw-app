// https://stackoverflow.com/questions/48754904/funky-image-positioning-in-react-native

import {Dimensions} from 'react-native';

export function logoSize(width, height) {
  var maxWidth = Dimensions.get('window').width;
  var maxHeight = height;

  if (width >= height) {
    var ratio = maxWidth / width;
    var h = Math.ceil(ratio * height);

    if (h > maxHeight) {
      // Too tall, resize
      var ratio = maxHeight / height;
      var w = Math.ceil(ratio * width);
      var ret = {
        'width': w,
        'height': maxHeight
      };
    } else {
      var ret = {
        'width': maxWidth,
        'height': h
      };
    }

  } else {
    var ratio = maxHeight / height;
    var w = Math.ceil(ratio * width);

    if (w > maxWidth) {
      var ratio = maxWidth / width;
      var h = Math.ceil(ratio * height);
      var ret = {
        'width': maxWidth,
        'height': h
      };
    } else {
      var ret = {
        'width': w,
        'height': maxHeight
      };
    }
  }

  return ret;
}
