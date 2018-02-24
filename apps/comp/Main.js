import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
import ReactNative from 'react-native';
import Drawer from 'react-native-drawer';

import Menu from './Menu';
import Dashboard from './Dashboard';
// import StockHome from './Stock/StockHome';
import { StackNavigator } from 'react-navigation';

export default class Main extends Component {
    closeControlPanel = () => {
        this.drawer.close();
    };
    openControlPanel = () => {
        this.drawer.open();
    };
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Menu navigation={this.props.navigation} />}
                openDrawerOffset={0.3}
                tapToClose={true}
            >
                <Dashboard navigation={this.props.navigation} open={this.openControlPanel.bind(this)}/>
                {/* <Dashboard open={this.openControlPanel.bind(this)}/> */}
            </Drawer>
        );
    }
}