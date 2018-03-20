import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import icMenu from '../img/ic_menu.png';
import StockHome from './Stock/StockHome';
import IntakeQuality from './Report/IntakeQuality';
import NPEUnfixed from './Report/NPEUnfixed';
import { StackNavigator } from 'react-navigation';
const { height } = Dimensions.get('window');
// import StockProduct from './Stock/StockProduct';
// import StockZone from './Stock/StockZone';

export default class Dashboard extends React.Component {

  openMenu(){
    const { open } = this.props;
    open();
  }

  render() {
    const { wrapper, row1, iconStyle, titleStyle, scrollContainer, labelComponent, labelTextComponent } = styles;
    // const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={wrapper}>
          <View style={row1}>
            <TouchableOpacity onPress={this.openMenu.bind(this)}>        
              <Image source={icMenu} style={iconStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>Dashboard</Text>
            <Text />
          </View>
        </View>
        <ScrollView style={scrollContainer} >
          <View style={labelComponent}>
            <Text style={labelTextComponent}>STOCK STACK</Text>
          </View>
            <StockHome navigation = {this.props.navigation}/>
          <View style={labelComponent}>
            <Text style={labelTextComponent}>INTAKE QUALITY</Text>
          </View>
          <IntakeQuality navigation = {this.props.navigation}/>
          <View style={labelComponent}>
            <Text style={labelTextComponent}>Unfixed Consignment</Text>
          </View>
          <NPEUnfixed navigation = {this.props.navigation}/>
        </ScrollView>
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
    justifyContent: 'space-between',
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
    // marginLeft: 100,    
  },
  scrollContainer: {
    flex:1,
  },
  labelComponent: {
    backgroundColor: 'black',
    height:35,
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#a9b6cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
},
  labelTextComponent: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize:20,
    marginLeft: 10,
  },
});