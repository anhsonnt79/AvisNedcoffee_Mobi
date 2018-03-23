import React from 'react';
import { StyleSheet, View, Text, Component } from 'react-native';
import Accordion from '../ExpandMenu/Accordion';
import { StackNavigator } from 'react-navigation';
 
const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...'
  }
];
 
export default class PurchaseHome extends React.Component {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }
 
  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }
 
  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f7f9',
      paddingTop: 30
    },
    
  });