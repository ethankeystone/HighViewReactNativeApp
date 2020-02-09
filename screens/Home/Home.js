import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { styles, buttons } from '../../components/styles';
import logo from "../../img/logo.png";

import { Auth } from 'aws-amplify';

import * as Font from 'expo-font';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFontLoading: true
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            "MainFont": require("../../font/Roboto-Regular.ttf")
        }).then(() => {
            this.setState({isFontLoading: false});
        })
        Auth.currentSession()
            .then(data => {
                //console.log(data);
                this.props.navigation.navigate("ReservationScreen");
            })
            .catch(err => console.log(err));
    }
    render() {
        if(this.state.isFontLoading) {
            return(
                <View></View>
            )
        } else {
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
}

