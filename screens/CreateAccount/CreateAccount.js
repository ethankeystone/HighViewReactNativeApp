import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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

    createAccount() {
        console.log(this.state);
        if(this.state.password != this.state.secondPassword) {
            this.setState({text: "Passwords do not match"});
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
                                    console.log("empty");
                                } else {
                                    this.setError("Email is already in use");
                                }
                            });
                    } else {
                        this.setError("Password must be greater than 8 characters");
                    }
                } else {
                    this.setError("Password field is empty");
                }
            } else {
                this.setError("Username field is empty");
            }
        }
    }

    setError(value) {
        this.setState({text: value});
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
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                </View>
                <View style={styles.textInputBorder}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText("password", text)}
                        secureTextEntry={true}
                        placeholder="Password"
                        ref={(input) => { this.secondTextInput = input; }}
                    />
                </View>
                <View style={styles.textInputBorder}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText("secondPassword", text)}
                        secureTextEntry={true}
                        placeholder="Please re-enter your password"
                        ref={(input) => { this.secondTextInput = input; }}
                    />
                </View>
                <TouchableOpacity
                        style={buttons.button1}
                        onPress={() => this.createAccount()}
                >
                        <Text style={buttons.buttonText1}> Create Account </Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}
