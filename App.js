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
  Home: {screen: Home, navigationOptions: {headerShown: false}}, 
  SignIn: { screen: SignIn, navigationOptions: {headerShown: false}},
  CreateAccount: {screen: CreateAccount, navigationOptions: {headerShown: false}},
  ConfirmationCode: {screen: ConfirmationCode, navigationOptions: {headerShown: false}},
  Success: {screen: Success, navigationOptions: {headerShown: false}},
  ForgotPassword: {screen: ForgotPassword, navigationOptions: {headerShown: false}},
  ResetPassword: {screen: ResetPassword, navigationOptions: {headerShown: false}}
});

const AppStack = createStackNavigator({ 
  ReservationScreen: {screen: ReservationScreen, navigationOptions: {headerShown: false}},
  ReserveSpot: {screen: ReserveSpot, navigationOptions: {headerShown: false}}
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
