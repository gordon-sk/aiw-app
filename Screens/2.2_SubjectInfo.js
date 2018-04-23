import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'react-native-elements';

// Class for recording user demographic information
// Age, gender, ethnicity, and education level
// Uses built-in components as well as a modal dropdown picker I found on github
// If user returns home, warning appears that data will be cleared
// If user finishes and continues, warning appears that information cannot be
// edited
export class Subject extends Component {
  state = {
    age: null,
    gender: null,
    ethnicity: null,
    education: null,
    genHeight: 150,
    EduHeight: 300,
    EduHeight: 300,
    keyboardType: 'default',
    genderD: {0: 'Male', 1: 'Female', 2: 'Unknown / Choose not to Report'},
    EthD: {
      0: 'American Indian/Alaskan Native',
      1: 'Asian',
      2: 'Native Hawaiian or other Pacific Islander',
      3: 'Black or African American',
      4: 'White',
      5: 'Hispanic',
      6: 'More than One Race',
      7: 'Unknown / Choose not to Report'
    },
    EduD: {
      0: 'No Diploma',
      1: 'High School Diploma',
      2: 'Trade School',
      3: 'Some College',
      4: 'College Bachelor Degree',
      5: 'Advanced or Professional Degre',
      6: 'I Choose not to Report'
    },
  }

  handleContinue = () => {
    if (this.state.age == null) {
      Alert.alert("Please enter your age.");
    }
    else if (this.state.gender == null) {
      Alert.alert("Please enter your gender.");
    }
    else if (this.state.ethnicity == null) {
      Alert.alert("Please enter your ethnicity.");
    }
    else if (this.state.education == null) {
      Alert.alert("Please enter your education.");
    }
    else if (this.state.age.includes('.')) {
      Alert.alert('Age should not contain a decimal.')
    }
    else {
      this.continue();
    }
  }

  continue() {
    this.props.navigation.navigate(
      'Info_Confirm',
      {
        age: this.state.age,
        gender: this.state.gender,
        education: this.state.education,
        ethnicity: this.state.ethnicity,
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.contentContainer}
        >
          <View>
            <Text style={styles.headerText}>
                  Please provide some general demographic information.
                  The information collected for this study will be maintained
                  confidentially, and will be used only for the purposes
                  of this study.
            </Text>
          </View>
          <View>
            <Text style={styles.categoryText}>Age:</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType = {this.state.keyboardType}
              maxLength = {2}
              Value = {this.state.age}
              onChangeText = {(text) => this.setState({age: text})}
            />
          </View>
          <View>
            <Text style={styles.categoryText}>Gender:</Text>
            <ModalDropdown
                style={styles.drop}
                textStyle={styles.dropText}
                dropdownStyle={{height: this.state.genHeight}}
                dropdownTextStyle={styles.dropdownText}
                options={[
                  this.state.genderD[0],
                  this.state.genderD[1],
                  this.state.genderD[2]
                ]}
                onSelect = {(val) => this.setState({gender: this.state.genderD[val]})}/>
          </View>
          <View>
            <Text style={styles.categoryText} >Ethnicity:</Text>
            <ModalDropdown
                style={styles.drop}
                textStyle={styles.dropText}
                dropdownStyle={{height: this.state.EthHeight}}
                dropdownTextStyle={styles.dropdownText}
                options={[
                  this.state.EthD[0],
                  this.state.EthD[1],
                  this.state.EthD[2],
                  this.state.EthD[3],
                  this.state.EthD[4],
                  this.state.EthD[5],
                  this.state.EthD[6],
                  this.state.EthD[7],
                ]}
                onSelect = {(val) => this.setState({ethnicity: this.state.EthD[val]})}/>
          </View>
          <View>
            <Text style={styles.categoryText} >Education:</Text>
            <ModalDropdown
                style={styles.drop}
                textStyle={styles.dropText}
                dropdownStyle={{height: this.state.EduHeight}}
                dropdownTextStyle={styles.dropdownText}
                options={[
                  this.state.EduD[0],
                  this.state.EduD[1],
                  this.state.EduD[2],
                  this.state.EduD[3],
                  this.state.EduD[4],
                  this.state.EduD[5],
                  this.state.EduD[6],
                ]}
                onSelect = {(val) => this.setState({education: this.state.EduD[val]})}/>
          </View>
          <View>
            <Button
	            raised
              backgroundColor='#CCC'
      	      color='black'
	            icon={{name: 'arrow-right', type: 'feather'}}
              onPress={() => this.handleContinue()}
              title='Continue'
            />
          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#808080',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 25,
    alignItems: 'center',
    paddingVertical: 15,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  inputStyle: {
    padding: 10,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
  },
  drop: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: 'white',
    width: Dimensions.get('window').width * .7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropText: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: Dimensions.get('window').width * .7,
  },
  dropdownText: {
    fontSize: 18,
    width: Dimensions.get('window').width * .7,
  },
  button: {
    backgroundColor: "#CCC",
    fontWeight: 'bold',
    color: 'black',
  },

});
