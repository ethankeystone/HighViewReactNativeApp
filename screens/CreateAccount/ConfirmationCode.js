import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { styles, buttons } from '../../components/styles' 
import BlueTriangle from "../../img/BlueTriangle.png";

export default class ConfirmationCode extends React.Component {
    state = {
        username: "",
        password: "",
        email:"",
        confirmationCode:"",
        needConfirmation: false,
        text: "",
        message: "Your account has successfully been created"
    }

    sendConfirmationCode() {
        console.log(this.state);
        Auth.confirmSignUp(this.state.username, this.state.confirmationCode, {
            forceAliasCreation: true    
        }).then(data => {
            this.props.navigation.navigate("Success", this.state);
        })
          .catch(err => {
                console.log(err);
                this.setError("Confirmation is not correct");
          });
    }
    onChangeText(key, value) {
        this.setState({
            [key]: value
        });
    }
    setError(value) {
        this.setState({text: value});
    }
    render() {
        const { navigation } = this.props;
        this.state.username = (navigation.getParam('username', 'N/A'));
        return(
            <View style={styles.main}>
                <Image source={BlueTriangle} style={styles.topTriangle}></Image>
                <View style={styles.container}>
                <Text style={styles.bigText}>Confirmation Code</Text>
                <Text style={styles.descriptionText}> A confirmation code has been sent to your email.</Text>
                <Text>{this.state.text}</Text>
                <View style={styles.textInputBorder}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText("confirmationCode", text)}
                        placeholder="Enter"
                        keyboardType={'numeric'}
                    />
                </View>

                <TouchableOpacity
                        style={buttons.button1}
                        onPress={() => this.sendConfirmationCode()}
                >
                        <Text style={buttons.buttonText1}> Submit </Text>
                </TouchableOpacity>
                </View>
                <Image source={BlueTriangle} style={styles.bottomTriangle}></Image>
            </View>
        );
    }
}

  