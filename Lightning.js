// lightning
////////////

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
import Thunder from './Thunder';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

// get global stylesheet
var gs = require ('./g_style');

export default class Lightning extends Component<{}> {

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
      title: 'Set Thunder',
      component: Thunder,
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
            <Text style={gs.heading}>Lightning</Text>
          </View>
          <View style={gs.sectionContent}>
            <Text style={gs.bodystandard}>Its just the flash, but hey, it works!
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
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Gentle</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>This is not a bad setting to start off with,
                    just a single flash.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item2'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Kinda Flashy</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>Couple of flashes, usually fine for light to
                    moderate sleepers.
                  </Text>
                </View>
              </RadioButton>
              <RadioButton value={'item3'}>
                <View style={{alignItems:'flex-start', marginLeft:10, marginRight:20}}>
                  <Text style={[gs.bodystandard, {textAlign: 'left'}]}>Night Club</Text>
                  <Text style={[gs.bodysmall, {textAlign: 'left'}]}>If youre sleeping with a partner, this setting
                    might get you into trouble. Youve been warned!
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
