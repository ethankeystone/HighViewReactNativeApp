import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';

import Home from "./screens/Home/Home";
import SignIn from "./screens/SignIn/SignIn";
import CreateAccount from "./screens/CreateAccount/CreateAccount";
import ConfirmationCode from "./screens/CreateAccount/ConfirmationCode";
import Success from "./screens/CreateAccount/Success";
import ReservationScreen from "./screens/ReservationScreen/ReservationScreen";
import ReserveSpot from "./screens/ReservationScreen/ReserveSpot";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./screens/ForgotPassword/ResetPassword";

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator, navigationOptions} from "react-navigation-stack";  


Amplify.configure(amplify);


const AuthStack = createStackNavigator({ 
  Home: {screen: Home}, 
  SignIn: { screen: SignIn},
  CreateAccount: {screen: CreateAccount},
  ConfirmationCode: {screen: ConfirmationCode},
  Success: {screen: Success},
  ForgotPassword: {screen: ForgotPassword},
  ResetPassword: {screen: ResetPassword}
});

const AppStack = createStackNavigator({ 
  ReservationScreen: {screen: ReservationScreen},
  ReserveSpot: {screen: ReserveSpot}
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Home,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      defaultNavigationOptions: {
        header: null
      },
    }
  )
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
