import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { styles, buttons } from '../../components/styles' 

export default class SignIn extends React.Component {
    state = {
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
                        this.onChangeText("text", e.message);
                        if (e.code === "UserNotConfirmedException") {
                            this.props.navigation.navigate("ConfirmationCode", this.state);
                        }
                    });
            } else {
                this.onChangeText("text", "Password is empty");
            }
        } else {
            this.onChangeText("text", "Username is empty");
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.bigText}> {this.state.text} </Text>
                <View style={styles.textInputBorder}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText("username", text)}
                        placeholder="Email Address"
                        returnKeyType = { "next" }
                        autoCapitalize = 'none'
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                </View>
                <View style={styles.textInputBorder}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText("password", text)}
                        secureTextEntry={true}
                        placeholder="password"
                        ref={(input) => { this.secondTextInput = input; }}
                    />
                </View>
                <TouchableOpacity
                        style={buttons.button1}
                        onPress={() => this.signIn()}
                >
                        <Text style={buttons.buttonText1}> Sign In </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
