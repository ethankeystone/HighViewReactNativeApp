import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import { styles, buttons } from '../../components/styles' 
import BlueTriangle from "../../img/BlueTriangle.png";

export default class Success extends React.Component {
    render() {
        return(
            <View style={styles.main}>
                <Image source={BlueTriangle} style={styles.topTriangle}></Image>
                <View style={styles.container}>
                    <Text style={styles.bigText}>Success!</Text>
                    <Text style={styles.descriptionText}>{this.props.navigation.getParam("message")}</Text>
                    <TouchableOpacity
                            style={buttons.button1}
                            onPress={()=> this.props.navigation.navigate("Home")}
                    >
                            <Text style={buttons.buttonText1}> Return </Text>
                    </TouchableOpacity>
                </View>
                <Image source={BlueTriangle} style={styles.bottomTriangle}></Image>
            </View>
        );
    }
}
