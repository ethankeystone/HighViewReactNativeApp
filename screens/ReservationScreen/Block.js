import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {buttons} from "../../components/styles";
var green = "#00FF37";
var red = "#FF0000";

export default class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SpaceID: this.props.spotInfo['SpaceID'],
            isOccupied: this.props.spotInfo['isOccupied'],
            userName: this.props.username,
            reservedBy: this.props.reservedBy
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

    navigateSpecificReserve() {
        console.log(this.props.plate)
        this.setState({
            username: this.props.username,
            plate: this.props.plate
        });

        this.props.navigation.navigate("ReserveSpot", this.state);
    }
    render() {
        
        return(
            <TouchableOpacity
            style={this.props.username == this.props.reservedBy ? styles.grey : styles.container}
            onPress={() => this.navigateSpecificReserve()}
            >
                <Text style={styles.text1}> Current SpaceID: {this.state.SpaceID}</Text>
                <Text style={styles.text1}> Location: Student Center</Text>
            </TouchableOpacity>
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
        backgroundColor: "#1273de",
        marginBottom: 15
    },
    grey: {
        backgroundColor: "grey",
        marginBottom: 15
    },
    text1: {
        padding: 10,
        paddingBottom: 2,
        margin: 5,
        color: "white",
        fontWeight: "bold",
        fontFamily: 'MainFont'
      },
    center: {
        textAlign: "center",
    }
})