// Main application page where snoring is captured
//////////////////////////////////////////////////

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  requireNativeComponent
} from 'react-native';
import Sensitivity from './Sensitivity';
import Thunder from './Thunder';
import Lightning from './Lightning';
import {NativeModules, NativeEventEmitter} from 'react-native';

// get global stylesheet
var gs = require ('./g_style');

//global var
var StormEngine = NativeModules.StormEngine;
//var GraphManager = NativeModules.GraphManager;
module.exports = requireNativeComponent('Graph', null);

const myModuleEvt = new NativeEventEmitter(NativeModules.StormEngine);
const snoreSubscription = null;

export default class MainPage extends Component <{}> {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      pause: false,
      snoreCount: "0"
    };

    //callback from native component - updates the snorecount
    snoreSubscription = myModuleEvt.addListener(
      'snoreDataCallback', (data) =>
        this.setState({ snoreCount: data })
      //(data) => self.setState({ snoreCount: data })
    );
    const testArray = (33,42,5,0,23,1,36,52,44,23,65,23,43,21,11,43,55);
  };

///////////////////////////
// UI Templates
///////////////////////////
  renderStart() {
    console.log('inhereeenthoghitsblank');
    if (this.state.recording) {
      if (this.state.pause) {
        return (
          <TouchableOpacity style={[styles.largeButton, {backgroundColor: '#393c46'}]}>
            <Text style={[gs.heading, {color: '#2e3038'}]}>PAUSED</Text>
          </TouchableOpacity>
        );
      } else {
          return (
            <TouchableOpacity style={[styles.largeButton, {backgroundColor: '#e60000'}]} onPress={this._onStartButtonPressed}>
              <Text style={gs.heading}>STOP</Text>
            </TouchableOpacity>
          );
      }
    } else {
       return (
          <TouchableOpacity style={styles.largeButton} onPress={this._onStartButtonPressed}>
            <Text style={[gs.heading, {color: '#000000'}]}>START</Text>
          </TouchableOpacity>
       );
    }
  }

  messageArea() {
    if(this.state.recording) {
      return (
        <View style={styles.messageContainer}>
          <Text style={gs.bodysmall}>SNORE COUNT</Text>
          <Text style={[gs.heading, {fontSize: 48}]}>{this.state.snoreCount}</Text>
          <Graph dummy={'dave'} style={{flex: 1}} />
        </View>
      );
    } else {
       return (
         <Text style={styles.instructions}>When you are ready for the SnoreStorm, hit start</Text>
       );
    }
  };

  renderPause() {
    if (!this.state.recording) {
      return null;
    } else {
      return (
        <TouchableOpacity style={[styles.smallButton, {borderColor: '#ffcc00'}]} onPress={this._onPauseButtonPressed}>
          <Text style={gs.bodysmall}>{this.state.pause ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
      );
    }
  };

  renderReset() {
    if (!this.state.recording) {
      return null;
    } else {
      return (
      <TouchableOpacity style={[styles.smallButton, {borderColor: '#990000'}]} onPress={this._onResetButtonPressed}>
        <Text style={gs.bodysmall}>Reset</Text>
      </TouchableOpacity>);
    }
  }

/////////////////////////////////
// Button methods //
/////////////////////////////////
  _onStartButtonPressed = () => {

    if (this.state.recording) {
      this.setState({ recording: false});
      StormEngine.stopTimer();
    } else {
      this.setState({ recording: true, snoreCount: "0"});
      StormEngine.startTimer();
    }
    //save to AWS
    //route
    //this._handleResponse();
  }

  _onResetButtonPressed = () => {
    this.setState({ recording: false, snoreCount: "0"});
    //native method
    StormEngine.reset();
  }

  _onPauseButtonPressed = () => {
    if (this.state.pause) {
      this.setState({ pause: false });
      //native method
      StormEngine.resumeTimer();
    } else {
      this.setState({ pause: true });
      //native method
      StormEngine.pauseTimer();
    }
  }

  _handleResponse = () => {
    //for now just initialRoute
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={[gs.sectionHeading, {flexDirection: 'row', }]}>
          <View style={{flexBasis:30}} />
          <Text style={gs.headingSmall}>SNORESTORM</Text>
          <Image source={require('./Resources/gearIcon.png')} style={styles.image}/>
        </View>
        <View style={styles.contentContainer}>
          {this.renderStart()}
        </View>
          {this.messageArea()}
        <View style={[gs.sectionFooter, {height: 160}]}>
          {this.renderPause()}
          {this.renderReset()}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'helvetica',
    color: '#FFFFFF',
    margin: 20,
  },
  largeButton: {
    backgroundColor: '#3377ff',
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    width: 280,
  },
  smallButton: {
    backgroundColor: '#2e3038',
    borderWidth: 2,
    borderRadius: 40,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin:40,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#2e3038',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 100,
  },
  image: {
    alignSelf: 'center',
    height:30,
    width: 30,
  }
});
