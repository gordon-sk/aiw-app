import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';

// Class for the front page of the App
// Standard react-native code... takes no props and only uses built-in components
// Header image
// Header Text
// Link to website
// Button to begin visual memory test
// Vanderbilt Uni logo
export class Login extends Component {
  state = {
    email: null,
    password: null,
    unknown: null,
    loading: null,
  }

  // plan is to expand this to handle user cancelling a login request
  // if it is taking forever for whatever reason...
  // as of right now, if the backend takes forever to respond to a login request,
  // and the user presses the back button, it will navigate from the home screen
  // to a login home screen suddenly. It is a little unintuitive. Not a huge deal.
  // Just something to make easier for user to understand.
  handleBackPress = () => {
    const { goBack } = this.props.navigation;
    if (!this.state.loading) {
      goBack();
    }
  }

  verifyLoginCreds = () => {
    if (this.state.email == null) {
      Alert.alert('Please enter an email address.');
    }
    else if (this.state.password == null) {
      Alert.alert('Please enter a password.');
    }
    else {
        this.setState({loading: true});
        var url = 'https://gskiesling.pythonanywhere.com/AIW/default/login?';
        url += 'email=' + this.state.email + '&';
        url += 'password=' + this.state.password;
        return fetch(url)
          .then((response) => response.text())
          .then((responseText) => {
            console.log('Receipt of login response: ' + responseText);
            if (responseText == 'Invalid email or password') {
              this.setState({unknown: true, loading: false});
              console.log("Invalid email or password entered");
            }
            else if (responseText.slice(0, 16) == "Login Successful"){
              global.key = responseText.slice(22, 38);
              global.user_ID = responseText.slice(47);
              global.user = this.state.email;
              this.props.navigation.navigate('Home');
            }
            else{
              console.log('unknown error occured during login from backend');
            }
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  // Security information:
  // http://web2py.com/book/default/chapter/07?search=formstyle#Complexity-and-security-validators

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              NOTE: logging in requires internet / cell connection.


              Please enter the email address you registered with below.
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            keyboardType = 'email-address'
            autoCorrect = {false}
            Value = {this.state.email}
            placeholder = 'you@example.com'
            onChangeText = {(text) => this.setState({email: text})}
          />
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Please enter your password.
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            keyboardType = 'default'
            Value = {this.state.password}
            placeholder = 'password'
            secureTextEntry = {true}
            onChangeText = {(text) => this.setState({password: text})}
          />
          {this.state.unknown ?
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            Unknown email or password.
          </Text>: null}
          <View style={styles.viewStyle}>
            <Button
              backgroundColor='#CCC'
        	    color='black'
              style={styles.button}
              loading={this.state.loading}
              icon={{name: 'login', type: 'entypo'}}
              onPress={() => this.verifyLoginCreds()}
              title='Log In'
            />
          </View>
          <View style={styles.viewStyle}>
            <Button
	                raised
                  backgroundColor='#CCC'
          	      color='black'
  	              icon={{name: 'arrow-left', type: 'feather'}}
                  onPress={() => this.handleBackPress()}
                  title='Go Back'
                />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// finishing off the file with some styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    marginTop: 20,
  },
  viewStyle: {
    marginTop: 25,
    width: Dimensions.get('window').width * .8
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height * 1.3
  },
  inputStyle: {
    padding: 10,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'left',
  },
  button: {
  }
});
