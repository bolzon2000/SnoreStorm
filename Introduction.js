//introduction
//////////////

'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Lightning from './Lightning';

// get global stylesheet
var gs = require ('./g_style');


export default class Introduction extends Component<{}> {

  _onNextButtonPressed = () => {
    this._handleResponse();
  }

  _handleResponse = () => {
    //for now just initialRoute
    this.props.navigator.push({
      title: 'Set Lightning',
      component: Lightning,
      navigationBarHidden: true,
      titleTextColor:'#FFFFFF'
      //passProps: {listings: response.listings}
    });
  }

  render() {
    return (

      <View style={gs.mainContainer}>
        <View style={gs.sectionHeading}>
          <Text style={gs.headingSmall}>SNORESTORM</Text>
        </View>
        <Image source={require('./Resources/lightningBolt.png')} style={styles.image}/>
        <View style={gs.contentContainer}>
          <View style={gs.sectionTitle}>
            <Text style={gs.heading}>Welcome to SnoreStorm</Text>
          </View>
          <View style={gs.sectionContent}>
            <Text style={gs.bodystandard}>Snorestorm is an application that triggers
            the sounds associated with a thunderstorm when you snore. These sounds can wake you up
            just enough to break the snoring cycle, similar to someone giving you a gentle nudge.
            </Text>
            <Text style={[gs.bodystandard, {margin: 20}]}>Just a few simple questions and youll be ready to start.
            </Text>
          </View>
          <View/>
        </View>
        <View style={gs.sectionFooter}>
          <TouchableOpacity style={styles.button} onPress={this._onNextButtonPressed}>
           <Text style={gs.bodystandard}> Next </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3377ff',
    borderRadius: 0,
    padding: 10,
    shadowColor: '#666666',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    alignSelf: 'stretch',
    flexGrow: 1
  },
  image: {
    alignSelf: 'center',
    height:60,
    width: 60,
  }
});
