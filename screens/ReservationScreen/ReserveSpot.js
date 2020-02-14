import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { styles, buttons } from '../../components/styles';
import { TextInput } from 'react-native-gesture-handler';

export default class ReserveSpot extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            LiscencePlate: "",
            username: this.props.navigation.state.params.userName,
            reservedBy: this.props.navigation.state.params.reservedBy
        }
    }
    reserve() {
        if (this.state.LiscencePlate != "") {
            const link = 'https://ivz6wn619e.execute-api.us-east-2.amazonaws.com/prod/reservesign';
            let data = {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "SpaceID": this.props.navigation.state.params.SpaceID,
                    "RequestedStatus": "1",
                    "Plate": this.state.LiscencePlate,
                    "Username": this.props.navigation.state.params.userName
                })
              }
              fetch(link, data)
              .then(response => response.json())  // promise
              .then(response => {
                this.makeAlert("Success", "Your reservation was successful");
                console.log(response);
            })
        } else {
            this.makeAlert("Error", "Please enter your liscence plate");
        }
    }

    unReserve() {
        const link = 'https://ivz6wn619e.execute-api.us-east-2.amazonaws.com/prod/reservesign';
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "SpaceID": this.props.navigation.state.params.SpaceID,
                "RequestedStatus": "0",
                "Plate": "0000",
                "Username": "default"
            })
          }
          fetch(link, data)
          .then(response => response.json())  // promise
          .then(response => {
            console.log(response);
            this.makeAlert("Success", "You successfully unreserved the spot.")
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

    onChangeText(index, text) {
        this.setState({[index]: text});
    }

    render() {
        if(this.state.reservedBy == this.state.username) {
            return(
                <View style={styles.main}>
                    <View style={styles.container}>
                        <Text>The SpaceID Number is : {this.props.navigation.state.params.SpaceID}</Text>
                        <Text>This spot is reserved by you</Text>
                        <Text>Liscence Plate: {this.props.navigation.state.params.plate} </Text>
                        <TouchableOpacity
                        style={buttons.button1}
                        onPress={() => this.unReserve()}
                        >
                        <Text style={buttons.buttonText1}> Unreserve </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return(
                <View style={styles.main}>
                    <View style={styles.container}>
                    <Text>The SpaceID Number is : {this.props.navigation.state.params.SpaceID}</Text>
                    <TextInput 
                            style={styles.textInput}
                            onChangeText={text => this.onChangeText("LiscencePlate", text)}
                            placeholder="Enter your Liscence Plate"
                    />
                    <TouchableOpacity
                    style={buttons.button1}
                    onPress={() => this.reserve()}
                    >
                       <Text style={buttons.buttonText1}> Reserve </Text>
                    </TouchableOpacity>
                </View>
                </View>
            )
        }
    }
}