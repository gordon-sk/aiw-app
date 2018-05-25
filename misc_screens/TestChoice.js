import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';

export class TestChoice extends React.Component {

  handleTap(val) {
    if (val=='bars') {
      this.props.navigation.navigate(
        'PT1_Instructions', {test_type: 'bars'}
      );
    }
    else if (val=='gratings') {
      this.props.navigation.navigate(
        'PT1_Instructions', {test_type: 'gratings'}
      );
    }
    else if (val=='colors') {
      this.props.navigation.navigate(
        '', {test_type: 'colors'}
      );
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.headerText}>
            There are three tests to choose from. Please select one.
          </Text>
          <Image
            source={require('../Pictures/instructions.png')}
            style={styles.image}
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'arrow-right', type: 'feather'}}
            onPress={() => this.handleTap('bars')}
            title='Bar Test'
          />
          <Image
            source={require('../Pictures/instructions.png')}
            style={styles.image}
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'arrow-right', type: 'feather'}}
            onPress={() => this.handleTap('gratings')}
            title='Grating Test'
          />

          <Image
            source={require('../Pictures/instructions.png')}
            style={styles.image}
          />
          <Button
            raised
            backgroundColor='#CCC'
            color='black'
            icon={{name: 'arrow-right', type: 'feather'}}
            onPress={() => this.handleTap('colors')}
            title='Color Test'
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    marginTop: 20,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
    marginBottom:70,
  },
  headerText: {
    width: Dimensions.get('window').width * .85,
    marginVertical: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    marginVertical: 20,
    resizeMode: 'contain',
  },
});
