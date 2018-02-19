import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
import ReactNative from 'react-native';
import Drawer from 'react-native-drawer';

import Menu from './Menu';
import Dashboard from './Dashboard';
// import checkLogin from '../../api/checkLogin';
// import getToken from '../../api/getToken';
// import global from '../global';

export default class Main extends Component {
    // componentDidMount() {
    //     getToken()
    //     .then(token => checkLogin(token))
    //     .then(res => global.onSignIn(res.user))
    //     .catch(err => console.log('LOI CHECK LOGIN', err));
    // }
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
                <Dashboard open={this.openControlPanel.bind(this)} />
            </Drawer>
        );
    }
}