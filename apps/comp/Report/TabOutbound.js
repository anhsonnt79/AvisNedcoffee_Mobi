import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Image
} from 'react-native';
import FOBDeviation from './FOBDeviation';
import FOBFranchise from './FOBFranchise';

// import TabNavigator from 'react-native-tab-navigator';
import TabNavigator from '../TabNaviga/TabNavigator';
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {Dimensions} from 'react-native'

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class TabOutbound extends Component {
  state= {
    selectedTab: 'fobDeviation'
  };

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'fobDeviation'}
          title="FOB Trans. Deviation" //Unfixed Consignment
          selectedTitleStyle={{color: "#3496f0"}}
          // renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
          // renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'fobDeviation'})}>
          <FOBDeviation navigation={this.props.navigation}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'FobFranchise'}
          title="FOB Franchise"
          selectedTitleStyle={{color: "#3496f0"}}
          // renderIcon={() => Image source={require('../img/Home.png')} style={[styles.icon, { tintColor: tintColor }]} />}
          // renderSelectedIcon={() => Image source={require('../img/HomeSelect.png')} style={[styles.icon, { tintColor: tintColor }]} />}
        //   badgeText="1"
          onPress={() => this.setState({selectedTab: 'FobFranchise'})}>
          <FOBFranchise navigation={this.props.navigation}/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
