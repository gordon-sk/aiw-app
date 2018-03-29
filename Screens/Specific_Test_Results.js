import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';

export class Specific_Test_Results extends React.Component {

  handleBackPress = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Results for {this.props.navigation.state.params.date}
        </Text>
        <Button
          raised
          backgroundColor='#CCC'
          color='black'
          icon={{name: 'arrow-left', type: 'feather'}}
          onPress={() => this.handleBackPress()}
          title='Go Back'
            />
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
});
