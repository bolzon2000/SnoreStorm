//Sensitivity
/////////////

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
import MainPage from  './MainPage';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

// get global stylesheet
var gs = require ('./g_style');

export default class Sensitivity extends Component<{}> {

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
      title: 'Snore Storm',
      component: MainPage,
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
            <Text style={gs.heading}>Sensitivity</Text>
          </View>
          <View style={gs.sectionContent}>
            <Text style={gs.bodystandard}>How loud should your snoring be before lightning flashes and thunder crashes?
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
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Quiet</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>The slightest snore will set things in motion. Not good for environments with
                    a lot of background noise.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item2'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Buzz Saw</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>A setting for people with a relatively loud snore. A good setting for most people
                    with snoring issues.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item3'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Jet Aircraft</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>Your snoring is a force of nature. Your snoring makes
                    water buffalo jealous.
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
