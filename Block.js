import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {buttons} from "./components/styles";
var green = "#00FF37";
var red = "#FF0000";

export default class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SpaceID: this.props.spotInfo['SpaceID'],
            isOccupied: this.props.spotInfo['isOccupied']
        }
        this.reserve = this.reserve.bind(this);
        this.unReserve = this.unReserve.bind(this);
    }

    reserve() {
        const link = 'https://ivz6wn619e.execute-api.us-east-2.amazonaws.com/prod/reservesign';
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "SpaceID": this.state.SpaceID,
                "RequestedStatus": "1",
                "Plate": "0000"
            })
          }
          fetch(link, data)
          .then(response => response.json())  // promise
          .then(response => {
            console.log(response);
          })
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
                "SpaceID": this.state.SpaceID,
                "RequestedStatus": "0",
                "Plate": "0000"
            })
          }
          fetch(link, data)
          .then(response => response.json())  // promise
          .then(response => {
            console.log(response);
          })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text styles={styles.text1}> Current SpaceID: {this.state.SpaceID}</Text>
                <Text>{this.state.occupied}</Text>
                <View style={styles.buttonView}>
                <TouchableOpacity
                    style={buttons.button1}
                    onPress={() => this.reserve()}
                >
                        <Text style={styles.text1}> Reserve </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15     
    },
    container: {
        backgroundColor: "#1273de"
    },
    text1: {
        textAlign: "center",
        padding: 15,
        color: "white",
        fontWeight: "bold",
        fontFamily: 'sans-serif'
      }
})