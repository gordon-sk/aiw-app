import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import { logoSize } from '../Components and Helpers/ImageSizing';
// import { testInitialization } from '../Components and Helpers/testInit';

// Class for the front page of the App
// Standard react-native code... takes no props and only uses built-in components
export class Home extends Component {
  state = {
    dims: logoSize(940, 198),
    url: 'https://filtergraph.com/aiw/default/results?user_ID=' + global.user_ID + '&key=' + global.key
  }

  handleLogOut = () => {
    var url = 'https://filtergraph.com/aiw/default/logout?';
    url += 'user_ID=' + global.user_ID + '&';
    url += 'key=' + global.key;
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        console.log('logout receipt: ' + responseText);
      })
      .catch((error) => {
        console.error(error);
        Alert('Something went wrong. Try checking your connection.');
      });
    global.user_ID = null;
    global.key = null;
    global.user = null;
    this.props.navigation.navigate('Home');
  }

  // componentDidMount() {
  //   testInitialization();
  // }

  render() {
    if (global.user != null) {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('../Pictures/VCAI-website-header-new-name.png')}
              style={{width: this.state.dims.width,
		                  height: this.state.dims.height}}
              resizeMode='contain'
            />
          </View>
          <Text style={styles.headerText}>Visual Memory Test</Text>
          <Text style={{paddingTop: 15}}>Welcome, {global.user}</Text>
          <Button
            raised
            backgroundColor='#CCC'
      	    color='black'
            style={styles.button}
            icon={{name: 'puzzle-piece', type: 'font-awesome'}}
            onPress={() => this.props.navigation.navigate('TestChoice')}
            title='Begin Test'
          />
          <Button
            raised
            backgroundColor='#CCC'
      	    color='black'
            icon={{name: 'log-out', type: 'entypo'}}
            onPress={() => this.handleLogOut()}
            title='Log Out'
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'book', type: 'entypo'}}
            onPress={() => Linking.openURL(this.state.url)}
            title='View Previous Results'
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'web', type: 'material-community'}}
            onPress={() => Linking.openURL('https://my.vanderbilt.edu/autismandinnovation/')}
            title='Visit our Website'
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'shield', type: 'font-awesome'}}
            onPress={() => Linking.openURL('https://filtergraph.com/aiw/default/privacy')}
            title='View Privacy Police'
          />
          <Image
            style={styles.uniImage}
            source={require('../Pictures/university.png')}
            resizeMode='contain'
          />
        </View>
        );
    }

    // if no user signed in:
    else {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('../Pictures/VCAI-website-header-new-name.png')}
              style={{width: this.state.dims.width,
		                  height: this.state.dims.height}}
              resizeMode='contain'
            />
          </View>
          <Text style={styles.headerText}>Visual Memory Test</Text>
          <Button
            raised
            backgroundColor='#CCC'
      	    color='black'
            icon={{name: 'md-create', type: 'ionicon'}}
            onPress={() => this.props.navigation.navigate('Registration')}
            title='New Account'
          />
          <Button
            raised
            backgroundColor='#CCC'
      	    color='black'
            icon={{name: 'login', type: 'entypo'}}
            onPress={() => this.props.navigation.navigate('Login')}
            title='Log in'
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'web', type: 'material-community'}}
            onPress={() => Linking.openURL('https://my.vanderbilt.edu/autismandinnovation/')}
            title='Visit our Website'
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'shield', type: 'font-awesome'}}
            onPress={() => Linking.openURL('https://filtergraph.com/aiw/default/privacy')}
            title='View Privacy Police'
          />
          <Image
            style={styles.uniImage}
            source={require('../Pictures/university.png')}
            resizeMode='contain'
          />
        </View>
        );
    }
  }
}

// finishing off the file with some styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 40,
    color: 'black',
  },
  uniImage: {
    height: Dimensions.get('window').height / 4,
  }
});
