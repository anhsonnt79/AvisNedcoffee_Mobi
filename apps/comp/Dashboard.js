import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import icMenu from '../img/ic_menu.png';

const { height } = Dimensions.get('window');

export default class Dashboard extends Component {

  openMenu(){
    const { open } = this.props;
    open();
  }

  render() {
    const { wrapper, row1, iconStyle, titleStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <View style={wrapper}>
          <View style={row1}>
            <TouchableOpacity style={{width: 30}} onPress={this.openMenu.bind(this)}>        
              <Image source={icMenu} style={iconStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>Dashboard</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: { 
      height: height / 10, 
      backgroundColor: '#fff',
      // padding: 10, 
      // paddingTop: 15,
  },
  row1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: 'space-around',
    marginBottom: 5
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
    // justifyContent: 'flex-start'
  },
  titleStyle: {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 20,
    marginLeft: 100,    
  },
});