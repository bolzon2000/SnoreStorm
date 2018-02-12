/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
   NavigatorIOS,
   StyleSheet
} from 'react-native';
import Introduction from './Introduction';
import MainPage from './MainPage';

export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'SnoreStorm',
          component: Introduction,
          navigationBarHidden: true,
          titleTextColor:'#FFFFFF'
        }}/>
    )
  }
};

const styles = StyleSheet.create({
  container: {
      flex: 1,

    },
    text: {
      padding: 10,
      fontSize: 14,
    },
});
