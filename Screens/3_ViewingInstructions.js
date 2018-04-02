import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { testInitialization } from '../Components and Helpers/testInit';

// TODO: Figure out what the psych people actually want
export class ViewingInstructions extends Component {

    componentDidMount() {
        testInitialization();
        this.backend_init();
    }

    backend_init() {
      var url = 'https://filtergraph.com/aiw/default/initiate_test?';
      url += 'key=' + global.key + '&';
      url += 'user_ID=' + global.user_ID;
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          console.log('Receipt of backend response: ' + responseText);
          if (responseText.slice(0, 14) == 'test initiated') {
            global.test_ID = responseText.slice(26);
          }
          else {
            console.log('Something went wrong on the backend.');
            // maybe throw error to user, inform them scores won't be recorded...
          }
      });
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.inBetween}/>
          <Text>
            On the next screen, you will place the facial outline over your
            face using this device's camera. Bill's example is displayed below:
          </Text>
          <Image
            source={require('../Pictures/billnye.png')}
            style={styles.pic}
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
     	      iconRight={{name: 'arrow-right', type: 'feather'}}
            onPress={() => this.props.navigation.navigate('Viewing')}
            title='Continue'
          />
          <View style={styles.inBetween}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#808080',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  pic: {
    maxWidth: '100%',
    height: Dimensions.get('window').height / 2
  },
  inBetween: {
    marginVertical: 15,
  }
});
