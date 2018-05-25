import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import { testInitialization } from '../Components and Helpers/testInit';

export class PT1_Instructions extends Component {

  componentWillMount() {
    testInitialization();
  }

  handlePress() {
    this.backend_init();
  }

  backend_init() {
     var test_type = this.props.navigation.state.params.test_type;
     console.log(test_type);
     var url = 'https://filtergraph.com/aiw/default/initiate_test?';
     url += 'key=' + global.key + '&';
     url += 'user_ID=' + global.user_ID + '&';
     url += 'test_type' + test_type;
     fetch(url)
       .then((response) => response.text())
       .catch(error => console.error('Error', error))
       .then((responseText) => {
         console.log('Receipt of backend response: ' + responseText);
         if (responseText.slice(0, 14) == 'test initiated' || true) {
           global.test_ID = responseText.slice(26);
           this.props.navigation.navigate(
             'PT1_Test', {count:0, scores: [], test_type: test_type }
           );
         }
         else {
           console.log('Something went wrong on the backend.');
           this.error_handler();
         }
     })
     .catch((error) => {
       console.error(error);
       this.error_handler();
     });
   }

   error_handler() {
     Alert.alert('Something went wrong. Please try again.');
     //this.props.navigation.navigate("Home");
   }

  render() {
    return (
      <View style={styles.container}>
        <View>
         <Text style={styles.headerText}>Thank you!</Text>
        </View>
        <View>
          <Text style={styles.instructionText}>
                How to rotate the central line in the display
          </Text>
        </View>
        <View>
          <Image
            source={require('../Pictures/instructions.png')}
            style={styles.picture}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <Text style={styles.instructionText}>
            Use one finger to scroll along the screen to adjust the angle of the central line,
            so it matches the angle of the other line. They should be
            parallel. Be as accurate as you can. To pass this test,
            your accuracy must be greater than 95%
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 25}}>
          <View style={styles.inbetween}></View>
          <Button
            raised
            backgroundColor='#CCC'
    	      color='black'
            iconRight={{name: 'arrow-right', type: 'feather'}}
            onPress={() => this.handlePress()}
            title='Start Practice Trials'
          />
        </View>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#808080',
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  picture: {
    height: Dimensions.get('window').height * .5
  },
  instructionText: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  inbetween: {
    marginVertical: 15,
  }
});
