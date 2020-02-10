import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { styles, buttons } from '../../components/styles' 

export default class CreateAccount extends React.Component {
    state = {
        username: "",
        password: "",
        secondPassword : "",
        email:"",
        confirmationCode:"",
        needConfirmation: false,
        text: "Please Enter your Information"
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

    createAccount() {
        if(this.state.password != this.state.secondPassword) {
            this.makeAlert("Passwords don't match", 
                    "The passwords entered do not match. Please try again.");
        } else {
            if(this.state.username != "") {
                if(this.state.password != "") {
                    if(this.state.password.length > 8) {
                        Auth.signUp({
                            username: this.state.username,
                            password: this.state.password
                            })
                            .then(data => {
                                console.log(data);
                                this.props.navigation.navigate("ConfirmationCode", this.state);
                            })
                            .catch(err => {
                                if(err.message == "Username cannot be empty") {
                                   this.makeAlert("Username field empty", "Username field cannot be empty");
                                } else {
                                    this.makeAlert("Email in use", "The email entered is already used. Please enter in a different email address");
                                }
                            });
                    } else {
                        this.makeAlert("Password is under 8 characters", "Please make your password 8 characters or more")
                    }
                } else {
                    this.makeAlert("Password field is empty", "Please enter a valid password");
                }
            } else {
                this.makeAlert("Username field is empty", "Please enter a valid username");
            }
        }
    }

    setError(value) {
        this.setState({text: value});
    }

    render() {
        return(
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.bigText}> Create An Account </Text>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("username", text)}
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        />
                    </View>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("password", text)}
                            secureTextEntry={true}
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => this.thirdTextInput.focus()}
                        />
                    </View>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Re-enter Password</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("secondPassword", text)}
                            secureTextEntry={true}
                            ref={(input) => { this.thirdTextInput = input; }}
                        />
                    </View>
                    <TouchableOpacity
                            style={buttons.button1}
                            onPress={() => this.createAccount()}
                    >
                            <Text style={buttons.buttonText1}> Create Account </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
}
