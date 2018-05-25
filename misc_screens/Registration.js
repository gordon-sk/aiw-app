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
export class Registration extends Component {
  state = {
    email: null,
    password1: null,
    password2: null,
    badPass: null,
    badEmail: null,
    error: null,
    loading: null,
    registered: null,
    errorText: null,
  }

  checkPassMatch = () => {
    if (this.state.password1 == null || this.state.password2 == null){
      this.setState({badPass: false});
    }
    else if (this.state.password1 != this.state.password2) {
      this.setState({badPass: true});
    }
    else if (this.state.password2.length < 4 && this.state.password2 != null) {
      this.setState({badPass: true});
    }
    else {
      this.setState({badPass: false});
    }
  }

  checkEmail = () => {
    if (this.state.email == null) {
      this.setState({badEmail: false});
    }
    else if (
      !this.state.email.includes('.') ||
      !this.state.email.includes('@') ||
      this.state.email.split('@')[0] == '' ||
      this.state.email.split('@')[1].split('.')[0] == '' ||
      this.state.email.split('.')[1] == ''
    ) {
        this.setState({badEmail: true});
        console.log("Clearly invalid email address entered: " + this.state.email);
    }
    else {
      this.setState({badEmail: false});
    }
  }

  backendRegister = () => {
    if (this.state.email == null || this.state.badEmail) {
      Alert.alert('Please enter an email address.');
    }
    else if (this.state.badPass || this.state.password1 == null || this.state.password2 == null) {
      Alert.alert('Please make sure your passwords match');
    }
    else {
      if (!this.state.badEmail && !this.state.badpass) {
        this.setState({loading: true});
        var url = 'https://filtergraph.com/aiw/default/register?';
        url += 'email=' + this.state.email + '&';
        url += 'password=' + this.state.password2;
        return fetch(url)
          .then((response) => response.text())
          .then((responseText) => {
            console.log('Receipt of registration response: ' + responseText);
            if (responseText == 'Email Already Taken') {
              this.setState({error: true, loading: false, errorText: 'Email already in use.'});
            }
            else if (responseText == 'bad parameters received') {
              this.setState({error: true, loading: false, errorText: 'unkown error occured'});
            }
            else {
              global.user_ID = responseText.slice(54);
              global.key = responseText.slice(29, 45);
              global.user = this.state.email;
              this.props.navigation.navigate('Subject');
              this.setState({
                password: null,
                password2: null,
                loading: false,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Alert('Something went wrong. Try checking your connection.');
          });
      }
    }
  }

  // Security information:
  // http://web2py.com/book/default/chapter/07?search=formstyle#Complexity-and-security-validators

  render() {
    const { goBack } = this.props.navigation;   // for going back
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Please enter an email address below. We will never send
              you any emails or share your address with anyone.

              NOTE: We recommend a valid email you will have access too, if
              you want to receive scores or reset your password.
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            keyboardType = 'email-address'
            autoCorrect = {false}
            Value = {this.state.email}
            placeholder = 'you@example.com'
            onChangeText = {(text) => this.setState({email: text})}
            onEndEditing = {() => this.checkEmail()}
          />
          {this.state.badEmail ?
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            Invalid email address detected.</Text>: null}
          {this.state.error ?
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            {this.state.errorText}</Text>: null}
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Please enter a password for your account. We recommend something that
              is not short or easy for anyone to guess. The most secure passwords
              are long (16+ characters) and can be made up of obscure but
              memorable phrases and words.
            </Text>
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Password must have a minimum length of four characters.
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            keyboardType = 'default'
            Value = {this.state.password1}
            placeholder = 'password'
            secureTextEntry = {true}
            onChangeText = {(text) => this.setState({password1: text})}
            onEndEditing = {() => this.checkPassMatch()}
          />
          <TextInput
            style={styles.inputStyle}
            keyboardType = 'default'
            Value = {this.state.password2}
            secureTextEntry = {true}
            placeholder = 'please re-enter password'
            onChangeText = {(text) => this.setState({password2: text})}
            onEndEditing = {() => this.checkPassMatch()}
          />
          {this.state.badPass ?
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            Passwords do not match or do not meet minimum length requirement.
          </Text>: null}
          <View style={styles.viewStyle}>
            <Button
              backgroundColor='#CCC'
        	    color='black'
              style={styles.button}
              loading={this.state.loading}
              icon={{name: 'md-send', type: 'ionicon'}}
              onPress={() => this.backendRegister()}
              title='Register'
            />
          </View>
          <View style={styles.viewStyle}>
            <Button
	                raised
                  backgroundColor='#CCC'
          	      color='black'
  	              icon={{name: 'arrow-left', type: 'feather'}}
                  onPress={() => goBack()}
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
    borderRadius: 3,
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
