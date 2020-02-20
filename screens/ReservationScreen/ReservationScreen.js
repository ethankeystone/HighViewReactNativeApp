import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Color, ScrollView, SafeAreaView, BackHandler, Image } from 'react-native';
import Block from './Block';
import Loading from '../Base/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles, buttons } from '../../components/styles';
import refresh from "../../img/refresh.png";
import logout from "../../img/logout.png";
import { Auth } from 'aws-amplify';

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Occupied: '',
      username: ''
      
    }
    this.isOccupied = this.isOccupied.bind(this);
    this.refresh = this.refresh.bind(this);
    this.isOccupied();
  }  
  
  componentDidMount() {
    this.getUserName();

  }
  isOccupied() {
    const link = 'https://ivz6wn619e.execute-api.us-east-2.amazonaws.com/prod/reservesign';
    let data = {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'same-origin',
      }
      fetch(link, data)
      .then(response => response.json())  // promise
      .then(response => {
          this.sortedArray(response);
          if(this.state.username == "") {

          } else {
            this.setState ({
              isLoading: false,
              Occupied: this.sortedArray(response)
            });
          }
      })
  }

  async getUserName() {
    const tokens = await Auth.currentSession();
    const username = tokens.getIdToken().payload['cognito:username'];
    this.setState({username: username});
    if(this.state.Occupied == "") {

    } else {
      this.setState ({
        isLoading: false,
        Occupied: ''
      });
    }
  }

  sortedArray(input) {
    let beforeSorting = [];
    let array = input["Items"];
    let min = 9999999;
    let index = 0;
    while(array.length > 0) {
      min = array[0]["SpaceID"];
      index = 0;
      for(let i = 0; i < array.length;i++) {
        if(parseInt(array[i]["SpaceID"]) < min) {
          min = array[i]["SpaceID"];
          index = i;
        }
      }
      beforeSorting.push(array[index]);
      array.splice(index, 1);
    }
    input["Items"] = beforeSorting;
    return (input);
  }

  refresh() {
    this.setState ({
      isLoading: true,
      Occupied: ''
    });

    this.isOccupied();
  }

  signOut() {
    Auth.signOut()
    .then(data => {
      console.log(data);
      this.props.navigation.navigate("Home")
    })
    .catch(err => console.log(err));
  }
  
  render() {
    if(this.state['isLoading']) {
      return (
        <View style={style.loading}>
          <Loading/>
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", paddingBottom: 5}}>
          <TouchableOpacity  onPress={() => {this.refresh()}}>
              <Image 
                source={refresh} 
                style={styles.icon}
              >   
              </Image>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {this.signOut()}}
                >
                <Image 
                  source={logout} 
                  style={styles.icon}
                >   
              </Image>
            </TouchableOpacity>
          </View>
          <ScrollView styles={styles.container}>
            {this.state.Occupied["Items"].map(object => {
              if((0 == object["isOccupied"] || object["Username"] == this.state.username) && object["CurrentStatus"] != 99) {
                  return (<Block 
                    spotInfo={object} 
                    key={object["SpaceID"]} 
                    navigation={this.props.navigation} 
                    username={this.state.username}
                    reservedBy={object["Username"]}
                    plate={object["Plate"]}
                  ></Block >)
              } else {

              }
              }
            )}
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979F9B',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },
  loading:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
