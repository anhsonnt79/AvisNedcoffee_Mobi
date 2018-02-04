import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class Dashboard extends Component {
  openMenu(){
    const { open } = this.props;
    open();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#02f3f7' }}>
        <Text>Dashboard</Text>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PContractTab')}> */}
        <TouchableOpacity onPress={this.openMenu.bind(this)}>        
          <Text>Open Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
