import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import profileIcon from '../img/profile.png';
import {
    StackNavigator,
  } from 'react-navigation';
export default class Menu extends Component {
    // constructor(props) {
    //     super(props);
        // this.state = { user: null };
        // global.onSignIn = this.onSignIn.bind(this);
    // }
    // gotoOrderHistory() {
    //     const { navigate } = this.props.navigation;
    //     navigate('PurchaseHome');
    // }
    render() {
        const { 
            container, profile, 
            btnSignInStyle, btnTextSignIn, loginContainer,
            username
        } = styles;
        const { navigate } = this.props.navigation;
        return (
            <View style={container}>
                    <Image source={profileIcon} style={profile} />
                    <View style={loginContainer}>
                    {/* <Text style={username}>{user ? user.name : ''}</Text> */}
                    <View>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('PurchaseHome')}>
                            <Text style={btnTextSignIn}>P-Contract</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('PurchaseHome')}>
                            <Text style={btnTextSignIn}>Purchase</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                    <View />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#34B089',
        fontSize: 15
    },
    loginContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    username: {
        color: '#fff', 
        fontFamily: 'Avenir', 
        fontSize: 15
    }
});
