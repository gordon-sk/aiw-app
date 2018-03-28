import React from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Home } from './Screens/1_FrontPage';
import { Registration } from './Screens/2.1_Registration';
import { Subject } from './Screens/2.2_SubjectInfo';
import { Login } from './Screens/2.3_Login';
import { ViewingInstructions } from './Screens/3_ViewingInstructions';
import { Viewing } from './Screens/4_Viewing';
import { PT1_Instructions } from './Screens/5_PT1_Instructions';
import { PT1_Test } from './Screens/6_PT1_Test';
import { PT1_Conclusion } from './Screens/7_PT1_Conclusion';
import { PT2_Instructions } from './Screens/8_PT2_Instructions';
import { PT2_Conclusion } from './Screens/9_PT2_Conclusion';
import { PT3_Instructions } from './Screens/10_PT3_Instructions';
import { PT3_Conclusion } from './Screens/11_PT3_Conclusion';
import { Test_Instructions } from './Screens/12_Test_Instructions';
import { Test_Conclusion } from './Screens/13_Test_Conclusion';
import { Questionnaire } from './Screens/14_Post_experiment_questionnaire';
import { Debrief } from './Screens/15_Debrief';
import { Test } from './Screens/Test';
import { TestingEnv } from './Screens/testtest';

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
  Login: {screen: Login},
  ViewingInstructions: {screen: ViewingInstructions},
  Viewing: {screen: Viewing},
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

  TestingEnv: {screen: TestingEnv},

  },

  // this disables backswiping on iOS
  {
    headerMode: 'none',
    navigationOptions: {gesturesEnabled: false},
  }
);
