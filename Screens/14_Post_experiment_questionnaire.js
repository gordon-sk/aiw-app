import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Dimensions,
	ScrollView,
	Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

export class Questionnaire extends Component {
	static NavOption = {
    title: 'Post_experiment_questionnaire',
  }
  state = {
  	engagement: null,
  	difficulty: null,
  	comments: null,
  }
  handlePress() {
  	this.backend();
		this.props.navigation.navigate('Debrief');
  }

  backend() {
  	var url = 'https://filtergraph.com/aiw/default/questionnaire?'
  	url += 'key=' + global.key + '&';
  	url += 'user_ID=' + global.user_ID + '&';
  	url += 'engagement=' + this.state.engagement + '&';
  	url += 'difficulty=' + this.state.difficulty + '&';
  	url += 'comments=' + this.state.comments;
  	fetch(url)
  		.then((response) => response.text())
  	  .then((responseText) => {
  	  		console.log(responseText);
  	  })
			.catch((error) => {
        console.error(error);
        Alert('Something went wrong. Try checking your connection.');
      });
  }

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.contentContainer}>
						<Text style={styles.headerText}>
							Post-Experiment Quesionnaire
						</Text>
						<View style={styles.inbetween}/>
						<Text style={styles.instructionText}>
							Congratulations, you are finished! Please answer the following
							questions.
						</Text>
						<View style={styles.inbetween}/>
						<Text style={styles.instructionText}>
							On a scale of 1-10 (where 10 is the most engaged), please rate how
							<Text style={styles.instructionTextBold}> ENGAGING </Text>
							you found the visual memory task.
						</Text>
						<View style={styles.inbetween}/>
						<ModalDropdown
							style={styles.drop}
							textStyle={styles.dropText}
							dropdownStyle={styles.dropDown}
							dropdownTextStyle={styles.dropText}
	            options={[
	              '0 - Not engaged', '1', '2', '3', '4', '5 - Moderately',
	              '6', '7', '8', '9', '10 - Very engaging',
	            ]}
	            onSelect = {(val) => this.setState({engagement: val})}
	          />
	          <View style={styles.inbetween}/>
						<Text style={styles.instructionText}>
							On a scale of 1-10 (where 10 is the most difficult), please rate how
							<Text style={styles.instructionTextBold}> DIFFICULT </Text>
							you found the visual memory task.
						</Text>
						<View style={styles.inbetween}/>
						<ModalDropdown
							style={styles.drop}
							textStyle={styles.dropText}
							dropdownStyle={styles.dropDown}
							dropdownTextStyle={styles.dropText}
	            options={[
                '0 - Not difficult at all', '1', '2', '3', '4',
	              '5 - Moderately difficult',
	              '6', '7', '8', '9', '10 - Very difficult',
	            ]}
	            onSelect = {(val) => this.setState({difficulty: val})}
	          />
	          <View style={styles.inbetween}/>
						<Text>Any comments for us?</Text>
						<View style={styles.inbetween}/>
						<TextInput
	            style = {styles.textInputStyle}
							multiline={true}
							maxHeight={200}
	            onChangeText = {(text) => this.setState({comments: text})}
	          />
	        <View style={styles.inbetween}/>
					<View style={{flexDirection: 'row', marginHorizontal: 25}}>
						<Button
							raised
							backgroundColor='#CCC'
							color='black'
							iconRight={{name: 'arrow-right', type: 'feather'}}
							onPress={() => this.handlePress()}
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
    justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
    paddingVertical: 15,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height * 1.3,
  },
	headerText: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		width: Dimensions.get('window').width * .9,
	},
	instructionText: {
		fontSize: 15,
		textAlign: 'center',
		padding: 5,
		width: Dimensions.get('window').width * .9,
	},
	instructionTextBold: {
		padding: 5,
		fontSize: 15,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	inbetween: {
		marginTop: 15,
	},
  textInputStyle: {
    padding: 10,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 200,
    fontSize: 15,
    textAlign: 'center',
    height: 100,
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
