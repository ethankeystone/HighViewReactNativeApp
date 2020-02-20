import { StyleSheet, PixelRatio } from 'react-native';
import { getCurrentFrame } from 'expo/build/AR';
import RNU from 'react-native-units';

var TEXT_INPUT  = 15;
var BUTTON_SIZE_WIDTH = 250;
var BUTTON_SIZE_HEIGHT = 50;
var BUTTON_PADDING = 15;
if (PixelRatio.get() <= 2) {
  TEXT_INPUT = 12;
  BUTTON_SIZE_WIDTH = 200;
  BUTTON_SIZE_HEIGHT = 35;
  BUTTON_PADDING = 8;
}
 const styles = StyleSheet.create({   
   container: {                       
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3
  },
   main: {
    backgroundColor: '#ffffff',
    padding: 0,
    margin: 0,
    flex: 1,
   },
   image: {
      width: RNU.vw(100),
      height: RNU.vh(20),
      resizeMode: 'contain'
   },
   textInputText: {
    color: "#004779",
    fontSize: TEXT_INPUT
   },
   textInput: {
      textAlign: "center",
      padding: 10,
      width: 300,
      fontSize: TEXT_INPUT,
      paddingLeft: 15,
      paddingRight: 15,
   },
   textInputBorder: {
    margin: 5,
    borderColor: "#004779",
    borderBottomWidth: 2
   },
   bigText: {
      textAlign: "center",
      padding: 15,
      color: "#004779"  ,
      fontWeight: "bold",
      fontFamily: "BigTextFont",
      fontSize: 40
    }, 
    descriptionText: {
      textAlign: "center",
      color: "#4D4F51"  ,
      fontFamily: "MainFont",
      fontSize: TEXT_INPUT,
      marginBottom: 30
    },
    topTriangle: {
      height: null, 
      width: null, 
      resizeMode: 'stretch',
      flex: 1,
      padding: 0,
      margin: 0
    },
    bottomTriangle: {
      height: null, 
      width: null, 
      resizeMode: 'stretch',
      flex: 1, 
      transform: [{rotate: '180deg'}]
    },
    icon: {
      resizeMode: 'contain',
      width: 32,
      height: 32
    }
 })
  
 const buttons = StyleSheet.create({  
   button1: {                   
     backgroundColor: "#004779",
     height: BUTTON_SIZE_HEIGHT,
     width: BUTTON_SIZE_WIDTH,
     margin: 10,
     marginTop: 30
   },
   buttonText1: {
     textAlign: "center",
     padding: BUTTON_PADDING,
     color: "white",
     fontWeight: "bold",
     fontFamily: "MainFont",
     fontSize: 17
   }, 
   button2: {
    color: "white",
    backgroundColor: "#004779",
    borderRadius: 20,
    height: 30,
    width: 150,
    margin: 10
   },
   button3: {
    color: "white",
    backgroundColor: "#004779",
    height: 30,
    width: 150,
    margin: 10
   },
   buttonText2: {
    textAlign: "center",
    padding: 8,
    color: "white",
    fontWeight: "bold",
    fontFamily: "MainFont"
   }
 })
  
 export { styles, buttons }  