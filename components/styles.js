 import { StyleSheet } from 'react-native'
import { getCurrentFrame } from 'expo/build/AR'


 const styles = StyleSheet.create({   
   container: {                       
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
   },
   image: {
      width: 400,
      height: 200,
      resizeMode: 'contain'
   },
   textInput: {
      textAlign: "center",
      padding: 10,
      width: 300,
      fontSize: 16,
      paddingLeft: 15,
      paddingRight: 15,
   },
   textInputBorder: {
    margin: 5,
    borderColor: "#1273de",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
   },
   bigText: {
      textAlign: "center",
      padding: 15,
      color: "#1273de",
      fontWeight: "bold",
      fontFamily: "sans-serif",
      fontSize: 20
    }
 })
  
 const buttons = StyleSheet.create({  
   button1: {                   
     color: "white",
     backgroundColor: "#1273de",
     borderRadius: 20,
     height: 50,
     width: 250,
     margin: 10
   },
   buttonText1: {
     textAlign: "center",
     padding: 15,
     color: "white",
     fontWeight: "bold",
     fontFamily: "sans-serif"
   }
 })
  
 export { styles, buttons }  