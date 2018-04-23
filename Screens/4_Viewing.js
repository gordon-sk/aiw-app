import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'

// This screen uses built-in components as well as the expo camera component
// An outline of a face is overlayed onto the user-facing camera,
// in an attempt to have the user keep the screen a set, specific distance away
// from their face
export class Viewing extends React.Component {
  state = {
    hasCameraPermission: null,
    show_camera: true,
  };
  static NavOption = { title: 'Viewing' };

  // app asks for camera permissions if they are not already granted
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  handlePress() {
    this.setState({show_camera: false});
    this.props.navigation.navigate('PT1_Instructions');
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { goBack } = this.props.navigation;   // for going back
    // if no permission granted or denied, empty screen
    if (hasCameraPermission === null) {
      return <View/>;
    // if permission denied, inform the user
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    // otherwise, we return the screen and image, with a button to continue
    // to screen 5
    } else if (this.state.show_camera) {
        return (
          <View style={{flex: 1}}>
            <Camera
              style={{flex: 1}}
              type={Camera.Constants.Type.front} // specifying the camera we want
              >
              <View style={styles.imageView}>
                <Image
                  source={require('../Pictures/face_outline.png')}
                  style={styles.face}
                  />
              </View>
              <View style={styles.buttonBottom}>
                <View style={styles.buttonRow}>
                  <Button
  	                raised
                    backgroundColor='#CCC'
            	      color='black'
    	              icon={{name: 'arrow-left', type: 'feather'}}
                    onPress={() => goBack()}
                    title='Go Back'
                  />
                  <Button
    	              raised
                    backgroundColor='#CCC'
            	      color='black'
      	            iconRight={{name: 'arrow-right', type: 'feather'}}
                    onPress={() => this.handlePress()}
                    title='Continue'
                  />
                </View>
              </View>
            </Camera>
          </View>
        );
      }
    else {
      return(<View style={{backgroundColor: '#808080', flex:1}}/>);
    }
  }
}

const styles = StyleSheet.create({
  face: {
    height: Dimensions.get('window').height/1.75,
    width: Dimensions.get('window').width/1.75,
  },
  imageView: {
    alignSelf: 'center',
    top: Dimensions.get('window').height / 4,
  },
  buttonBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
