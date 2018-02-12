//Thunder configuration
///////////////////////

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import Sensitivity from './Sensitivity';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

// get global stylesheet
var gs = require ('./g_style');

export default class ThunderConfig extends Component <{}> {

  constructor(){
    super()
    this.state = {
      text: ''
    }
    this.onSelect = this.onSelect.bind(this)
  }

  _onNextButtonPressed = () => {
    //save to AWS
    //route
    this._handleResponse();
  }

  _handleResponse = () => {
    //for now just initialRoute

    this.props.navigator.push({
      title: 'Set Sensitivity',
      component: Sensitivity,
      navigationBarHidden: true,
      titleTextColor:'#FFFFFF'
      //passProps: {listings: response.listings}
    });
  }

  onSelect(index, value){
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  render() {


    return (

      <View style={gs.mainContainer}>
        <View style={gs.sectionHeading}>
          <Text style={gs.headingSmall}>SNORESTORM</Text>
        </View>
        <View style={gs.contentContainer}>
          <View style={gs.sectionTitle}>
            <Text style={gs.heading}>Thunder</Text>
          </View>
          <View style={gs.sectionContent}>
            <Text style={gs.bodystandard}>How loud should the thunder be during this snorestorm? Decide below!
            </Text>
          </View>
          <View style={gs.sectionContent}>
            <RadioGroup
              size={24}
              thickness={2}
              color='#3377ff'
              activeColor='#ffffff'
              onSelect = {(index, value) => this.onSelect(index, value)}>
              <RadioButton value={'item1'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Gentle Storm</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>You are a light sleeper, too much thunder and your sleep might be
                    disturbed. A good place to start.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item2'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Heavy Storm</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>Good setting for people that are light to moderate sleepers.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item3'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Hurricane</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>You sleep like the dead. The right setting for heavy sleepers.
                  </Text>
                </View>
              </RadioButton>
            </RadioGroup>
          </View>
        </View>
        <View style={gs.sectionFooter}>
          <TouchableOpacity style={gs.button} onPress={this._onNextButtonPressed}>
           <Text style={gs.bodystandard}> Back </Text>
          </TouchableOpacity>
          <View style={{flexBasis:20}} />
          <TouchableOpacity style={gs.button} onPress={this._onNextButtonPressed}>
            <Text style={gs.bodystandard}> Next </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({

});
