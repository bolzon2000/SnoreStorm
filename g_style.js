'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  bodystandard: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'helvetica',
    color: '#FFFFFF',
  },
  bodysmall: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'helvetica',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'helvetica',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  headingSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'helvetica',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3377ff',
    borderRadius: 0,
    padding: 10,
    shadowColor: '#666666',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    flexGrow: 1,
  },
  //views
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#003366',
  },
  contentContainer: {
    justifyContent: 'flex-start'
  },
  sectionHeading: {
    margin: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionContent: {
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    margin: 20,
  },
  sectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
});
