import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { styles, buttons } from '../../components/styles' 

export default class ConfirmationCode extends React.Component {
    state = {
        username: "",
        password: "",
        email:"",
        confirmationCode:"",
        needConfirmation: false,
        text: ""
    }

    sendConfirmationCode() {
        console.log(this.state);
        Auth.confirmSignUp(this.state.username, this.state.confirmationCode, {
            forceAliasCreation: true    
        }).then(data => {
            this.props.navigation.navigate("Success");
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
            <View style={styles.container}>
                <Text> An confirmation code has been sent to your email.</Text>
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
        );
    }
}

  