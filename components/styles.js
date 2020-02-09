import { StyleSheet } from 'react-native'
import { getCurrentFrame } from 'expo/build/AR'


 const styles = StyleSheet.create({   
   container: {                       
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
  },
   main: {
    backgroundColor: '#ffffff',
    flex:1,
   },
   image: {
      width: 400,
      height: 200,
      resizeMode: 'contain'
   },
   textInputText: {
    color: "#004779"
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
    borderColor: "#004779",
    borderBottomWidth: 2
   },
   bigText: {
      textAlign: "center",
      padding: 15,
      color: "#004779"  ,
      fontWeight: "bold",
      fontFamily: "MainFont",
      fontSize: 40
    }, 
    triangleCorner: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: 100,
      borderTopWidth: 100,
      borderRightColor: 'transparent',
      borderTopColor: 'red'
    },
 })
  
 const buttons = StyleSheet.create({  
   button1: {                   
     color: "white",
     backgroundColor: "#004779",
     height: 50,
     width: 250,
     margin: 10,
     marginTop: 30
   },
   buttonText1: {
     textAlign: "center",
     padding: 15,
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