import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';

import Home from "./Home";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import ConfirmationCode from "./ConfirmationCode";
import Success from "./Success";
import ReservationScreen from "./ReservationScreen";

import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";  

Amplify.configure(amplify);


const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  SignIn: { screen: SignIn },
  CreateAccount: {screen: CreateAccount},
  ConfirmationCode: {screen: ConfirmationCode},
  Success: {screen: Success},
  ReservationScreen: {screen: ReservationScreen}
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
