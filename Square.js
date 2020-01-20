import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Square extends Component {    
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <Text style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor
            }}>

        </Text>
        );
    }
}


