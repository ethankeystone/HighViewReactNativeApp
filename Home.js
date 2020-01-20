import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { styles, buttons } from './components/styles';
import logo from "./img/logo.png";

export default class Home extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Image source={logo} style={styles.image}></Image>
                <TouchableOpacity
                        style={buttons.button1}
                        onPress={()=> this.props.navigation.navigate("SignIn")}
                >
                        <Text style={buttons.buttonText1}> Sign In </Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={buttons.button1}
                        onPress={()=> this.props.navigation.navigate("CreateAccount")}
                >
                        <Text style={buttons.buttonText1}> Create Account </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

