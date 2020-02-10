import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { styles, buttons } from '../../components/styles' 

export default class Success extends React.Component {
    render() {
        return(
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.bigText}>Success</Text>
                    <Text style={styles.descriptionText}>{this.props.navigation.getParam("message")}</Text>
                    <TouchableOpacity
                            style={buttons.button1}
                            onPress={()=> this.props.navigation.navigate("Home")}
                    >
                            <Text style={buttons.buttonText1}> Press Here to Login </Text>
                    </TouchableOpacity>
            </View>
            </View>
        );
    }
}
