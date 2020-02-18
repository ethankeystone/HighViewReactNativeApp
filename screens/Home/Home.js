import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, StatusBar } from 'react-native';
import { styles, buttons} from '../../components/styles';
import logo from "../../img/logo.png";
import BlueTriangle from "../../img/BlueTriangle.png";

import { Auth } from 'aws-amplify';

import * as Font from 'expo-font';

export default class Home extends React.Component {
    state = {
        isFontLoading: true,
        username: "",
        password: "",
        email:"",
        confirmationCode:"",
        needConfirmation: false,
        text: ""
    }
    
    onChangeText(key, value) {
        this.setState({
            [key]: value
        });
    }
    
    makeAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }

    signIn() {
        if (this.state.username != "") {
            if (this.state.password != "") {
                Auth.signIn(this.state.username, this.state.password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                        Auth.completeNewPassword(
                            user,               // the Cognito User Object
                            newPassword,       // the new password
                            // OPTIONAL, the required attributes
                            {
                            email: 'xxxx@example.com',
                            phone_number: '1234567890'
                            }
                        ).then(user => {
                            //console.log(user);
                            //console.log("SUCCESS");
                        }).catch(e => {
                            //console.log(e);
                        
                        });
                    } else {
                        this.props.navigation.navigate("ReservationScreen");
                    }
                    }).catch(e => {
                        console.log(e);
                        if (e.code === "UserNotConfirmedException") {
                            this.props.navigation.navigate("ConfirmationCode", this.state);
                        } else {
                            this.makeAlert("Error", e.message);
                        }
                    });
            } else {
                this.makeAlert("Password field is empty", "Please enter a valid password");
            }
        } else {
            this.makeAlert("Username field is empty", "Please enter a valid username");
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            "MainFont": require("../../font/Roboto-Regular.ttf"),
            "BigTextFont": require("../../font/Montserrat-Bold.ttf")
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
                <View style={styles.main}>

                    <Image source={BlueTriangle} style={{height: null, width: null, flex: 1}}></Image>   
                    <View style={styles.container}>
                        <Image source={logo} style={styles.image}></Image>
                        <View style={styles.textInputBorder}>
                            <Text style={styles.textInputText}>Username</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.onChangeText("username", text)}
                                returnKeyType = { "next" }
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                autoCapitalize = 'none'
                            />
                        </View>
                        <View style={styles.textInputBorder}>
                            <Text style={styles.textInputText}>Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => this.onChangeText("password", text)}
                                    secureTextEntry={true}
                                    ref={(input) => { this.secondTextInput = input; }}
                                    autoCapitalize = 'none'
                                />
                        </View>
                        <TouchableOpacity
                                style={buttons.button1}
                                onPress={() => this.signIn()}
                        >
                            <Text style={buttons.buttonText1}> Login </Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.textInputBorder} onPress={() => this.props.navigation.navigate("ForgotPassword")}>Forgot Password?</Text>

                        <Text style={styles.textInputBorder, {marginTop: 60}} onPress={() =>  this.props.navigation.navigate("CreateAccount")}>Don’t have an account? Create One</Text>
                    </View>
                    <Image source={BlueTriangle} style={{height: null, width: null, flex: 1, transform: [{rotate: '180deg'}]}}></Image>   
                </View>   
            );
        }
    }
}

