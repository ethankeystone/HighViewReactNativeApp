import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export default class Loading extends Component {
    constructor(props) {
        super(props);

        this.loadingSpin = new Animated.Value(0);
    }
  
    componentDidMount() {
        this.spinAnimation();
    }
    spinAnimation() {
        this.loadingSpin.setValue(0);
        Animated.sequence([
            Animated.timing(
                this.loadingSpin,
                {
                    toValue: 1,
                    duration: 1000
                }
            )
        ]).start(() => this.spinAnimation());
    }
    render() {
        const spin = this.loadingSpin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']            
        });
        return(
            <View > 
                <Animated.Image source={require("./img/Loading.png/")} style={{
        width: 40,
        height: 40,
        transform: [{rotate: spin}]
    }} />
            <Text>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40
    },
  });
  