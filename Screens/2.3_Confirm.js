import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';

export class Info_Confirm extends React.Component {
  state = {
    age: this.props.navigation.state.params.age,
    ethnicity: this.props.navigation.state.params.ethnicity,
    gender: this.props.navigation.state.params.gender,
    education: this.props.navigation.state.params.education,
  }

  handleForward() {
    this.props.navigation.navigate('Home');
  }

  handleBack() {
    this.props.navigation.goBack();
  }

  record = () => {
    var url = 'https://filtergraph.com/aiw/default/bio_call?';
    url += 'age=' + String(this.state.age) + '&';
    url += 'gender=' + this.state.gender + "&";
    url += 'ethnicity=' + this.state.ethnicity + "&";
    url += 'education=' + this.state.education + '&';
    url += 'user_ID=' + global.user_ID + "&";
    url += 'key=' + global.key;
    return fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        console.log('Receipt of bio info backend: ' + String(responseText));
    })
    .catch((error) => {
        console.error(error);
        Alert('Something went wrong. Try checking your connection.');
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Note that going forward, you will not be able to change the
          demographic information  you have provided. Please take a second to
          look it over and confirm it is correct. If it is not, please go back
          change it.
        </Text>
        <Text style={styles.infoText}>
        Age: {this.state.age}
        </Text>
        <Text style={styles.infoText}>
        Gender: {this.state.gender}
        </Text>
        <Text style={styles.infoText}>
        Ethnicity: {this.state.ethnicity}
        </Text>
        <Text style={styles.infoText}>
        Education: {this.state.education}
        </Text>
        <View style={styles.buttonBottom}>
          <View style={styles.buttonRow}>
            <Button
              raised
              backgroundColor='#CCC'
              color='black'
              icon={{name: 'arrow-left', type: 'feather'}}
              onPress={() => this.handleBack()}
              title='Go Back'
            />
            <Button
              raised
              backgroundColor='#CCC'
              color='black'
              iconRight={{name: 'arrow-right', type: 'feather'}}
              onPress={() => this.handleForward()}
              title='Continue'
            />
          </View>
        </View>

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
  },
  text: {
    width: Dimensions.get('window').width * .9,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
  },
  infoText: {
    marginVertical: 15,
    fontSize: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
