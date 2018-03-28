import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';

export class PT1_Instructions extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
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
          />
        </View>
        <View>
          <Text style={styles.instructionText}>
            Scroll along the screen to adjust the angle of the central line,
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
            onPress={() => navigate('PT1_Test', {count: 0, scores: []})}
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
    padding: 10,
    textAlign: 'center',
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
