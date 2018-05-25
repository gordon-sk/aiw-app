import React from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Home } from './misc_screens/FrontPage';
import { Registration } from './misc_screens/Registration';
import { Subject } from './misc_screens/SubjectInfo';
import { Info_Confirm } from './misc_screens/Confirm';
import { Login } from './misc_screens/Login';
import { TestChoice } from './misc_screens/TestChoice';
import { Questionnaire } from './misc_screens/Post_experiment_questionnaire';
import { Debrief } from './misc_screens/Debrief';

import { PT1_Instructions } from './bars_and_gratings_screens/PT1_Instructions';
import { PT1_Test } from './bars_and_gratings_screens/PT1_Test';
import { PT1_Conclusion } from './bars_and_gratings_screens/PT1_Conclusion';
import { PT2_Instructions } from './bars_and_gratings_screens/PT2_Instructions';
import { PT2_Conclusion } from './bars_and_gratings_screens/PT2_Conclusion';
import { PT3_Instructions } from './bars_and_gratings_screens/PT3_Instructions';
import { PT3_Conclusion } from './bars_and_gratings_screens/PT3_Conclusion';
import { Test_Instructions } from './bars_and_gratings_screens/Test_Instructions';
import { Test } from './bars_and_gratings_screens/Test';
import { Test_Conclusion } from './bars_and_gratings_screens/Test_Conclusion';



export default class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  render() {
    return <AppNav/>;
  }
}

const AppNav = StackNavigator({
  Home: { screen: Home },
  Registration: {screen: Registration},
  Subject: {screen: Subject},
  Info_Confirm: {screen: Info_Confirm},
  Login: {screen: Login},
  TestChoice: {screen: TestChoice},
  PT1_Instructions: {screen: PT1_Instructions},
  PT1_Test: {screen: PT1_Test},
  PT1_Conclusion: {screen: PT1_Conclusion},
  PT2_Instructions: {screen: PT2_Instructions},
  PT2_Conclusion: {screen: PT2_Conclusion},
  PT3_Instructions: {screen: PT3_Instructions},
  PT3_Conclusion: {screen: PT3_Conclusion},
  Test_Instructions: {screen: Test_Instructions},
  Test: {screen: Test},
  Test_Conclusion: {screen: Test_Conclusion},
  Questionnaire: {screen: Questionnaire },
  Debrief: {screen: Debrief},

  },

  // this disables backswiping on iOS
  {
    headerMode: 'none',
    navigationOptions: {gesturesEnabled: false},
  }
);
