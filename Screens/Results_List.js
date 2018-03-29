import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	ActivityIndicator,
	ScrollView,
	Dimensions,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

export class Results_List extends React.Component {

	state = {
		dates: null,
		loading: true,
		months: {
		   1: "January",
			 2: "February",
			 3: "March",
			 4: "April",
			 5: "May",
			 6: "June",
			 7: "July",
			 8: "August",
			 9: "September",
			 10: "October",
			 11: "November",
			 12: "December",
		 },
	}

	componentWillMount() {
		this.fetchTests();
		this.renderList();
	}

	fetchTests() {
		var url = 'https://gskiesling.pythonanywhere.com/AIW/default/test_list?';
    url += 'user_ID=' + global.user_ID + '&';
    url += 'key=' + global.key;
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
				if (responseText == 'invalid key passed') {
					console.log('test list receipt:', responseText);
					this.props.navigation.navigate('Home');
				}
				else if (responseText.slice(0, 1) != '['){
        	console.log('something went wrong on the backend.', responseText);
					this.props.navigation.navigate('Home');
				}
				else {
					console.log('test list received.');
					test_list = responseText.slice(1, responseText.length - 1)
					test_list = test_list.split(',');
					console.log(test_list[0]);
					this.setState({dates: test_list, loading: false});
				}
      });
		this.setState({backend_received: true});

	}

	renderList() {
		list = [];
		for (let x=0; x<10; x++) {
			var button_date = this.state.dates[x].trim();
			var date = new Date();
			var timezoneOffset = date.getTimezoneOffset() / 60;
			var Year = button_date.slice(1, 5);
			var Month = this.state.months[Number(button_date.slice(6, 8))];
			var Day = button_date.slice(9, 11);
			var Hour = Number(button_date.slice(12, 14)) - timezoneOffset;
			var meridiem = 'am';
			if (Hour > 11) {
				meridiem = 'pm';
			}
			if (Hour > 12) {
				Hour -= 12;
			}
			var Minute = button_date.slice(15, 17);
			var title = Day + ' ' + Month + ', ' + Year;
			var subtitle = String(Hour) + ':' + Minute + ' ' + meridiem;
			list.push(
				{
					title: title,
					subtitle: subtitle,
				}
			);
		}
	this.setState({dates_list: list});
	}

	render() {
		if (!this.state.loading) {
			if (this.state.dates==null) {
				return(
					<View style={{top: 75}}>
						<Text>
							 Take a few tests and your
							 results will appear here.
						</Text>
					</View>
				);
			}
			else {
				return(
					<View style={styles.container}>
						<ScrollView
							contentContainerStyle={{
							    flex: 0,
							    //height: this.state.dates_list.length * 50,
							}}>
							<View style={styles.inBetween}/>
							<List containerStyle={{marginBottom: 20}}>
  							{this.state.dates.map((l, i) => (
      						 <ListItem
        					 		key={i}
        							title={l.title}
											subtitle={l.subtitle}
											onPress={() => this.onPress()}
      							/>
    							))
  							}
							</List>
						</ScrollView>
					</View>
				);
			}
		}
		else {
			return(
				<View style={styles.container}>
					<View style={styles.activityContainer}>
						<ActivityIndicator size="large" color="#00ff00"/>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			backgroundColor: '#808080',
			marginTop: 20,
		},
	activityContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	inBetween: {
		paddingVertical: 15,
	},
	button: {
		height: 75,
		width: Dimensions.get('window').width * .8,
		alignItems: 'center',
	}
});
