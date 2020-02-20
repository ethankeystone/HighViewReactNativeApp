
import React from "react";
import {Text, View, TextInput, TouchableOpacity, Alert, Image} from "react-native";
import { styles, buttons } from "../../components/styles";
import { Auth } from 'aws-amplify';
import BlueTriangle from "../../img/BlueTriangle.png";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.getParam("email"),
            code: "",
            password: "",
            reEnterPassword: "",
            message: "Your password has successfully been reset"
        }
    }

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }

    resetPassword() {
        if(this.state.password !== this.state.reEnterPassword) {
            this.makeAlert("Passwords don't match", "The entered passwords do not match");
        } else {
            if(this.state.password != "") {
                if(this.state.password.length > 8) {
                    Auth.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
                        .then(data => {this.props.navigation.navigate("Success", this.state)})
                        .catch(err => console.log(err));
                } else {
                    this.makeAlert("Password is under 8 characters", "Please make your password 8 characters or more")
                }
            } else {
                this.makeAlert("Password field is empty", "Please enter a valid password");
            }
        } 
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


    render() {
        return(
            <View style={styles.main}>
                <Image source={BlueTriangle} style={styles.topTriangle}></Image>   
                <View style={styles.container}>
                    <Text style={styles.bigText}>Reset Password</Text>
                    <Text style={styles.descriptionText}>
                        Enter the code sent to your email and your new password
                    </Text>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Code</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("code", text)}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>New Password</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            onChangeText={text => this.onChangeText("password", text)}
                        />
                    </View>
                    <View style={styles.textInputBorder}>
                        <Text style={styles.textInputText}>Re-enter password</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("reEnterPassword", text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                            style={buttons.button1}
                            onPress={() => this.resetPassword()}
                    >
                            <Text style={buttons.buttonText1}> Reset </Text>
                    </TouchableOpacity>
                </View>
                <Image source={BlueTriangle} style={styles.bottomTriangle}></Image>   
            </View>
        )
    }
}