
import React from "react";
import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native";
import { styles, buttons } from "../../components/styles";
import { Auth } from 'aws-amplify';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
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

    forgotPassword() {
        if (this.state.email === "") {
            this.makeAlert("Email field empty", "Please enter a valid email");
        } else {
            Auth.forgotPassword(this.state.email)
            .then(data => {
                console.log(data);
                this.props.navigation.navigate("ResetPassword", this.state);
            })
            .catch(err => {
                if(err.code === "UserNotFoundException") {
                    this.makeAlert("Account not found", "That email address is not associated with any account in our database");
                }
            });
        }
    }

    render() {
        return(
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.bigText}>Forgot Password?</Text>
                    <Text style={styles.descriptionText}>
                        Enter your email to reset your password
                    </Text>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Email Address</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("email", text)}
                        />
                    </View>
                    <TouchableOpacity
                            style={buttons.button1}
                            onPress={() => this.forgotPassword()}
                    >
                            <Text style={buttons.buttonText1}> Reset </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}