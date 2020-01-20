import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Color, ScrollView, SafeAreaView } from 'react-native';
import Block from './Block';
import Loading from './Loading';


export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Occupied: ''
    }
    this.isOccupied = this.isOccupied.bind(this);
    this.refresh = this.refresh.bind(this);
    this.isOccupied();
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
          this.setState ({
            isLoading: false,
            Occupied: this.sortedArray(response)
          });
      })
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

  render() {
    if(this.state['isLoading']) {
      return (
        <View style={styles.loading}>
          <Loading/>
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <ScrollView styles={styles.container}>
           <Button title="Refresh Page" onPress={this.refresh}/>
            {this.state.Occupied["Items"].map(object => {
              if(0 == object["isOccupied"]) {
                  return (<Block spotInfo={object} key={object["SpaceID"]}></Block>)
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979F9B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
