import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import profileIcon from '../img/profile.png';
import { StackNavigator } from 'react-navigation';

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
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('Main')}>
                            <Text style={btnTextSignIn}>DASHBOARD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('StockHome')}>
                            <Text style={btnTextSignIn}>STOCK STACK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('PurchaseHome')}>
                            <Text style={btnTextSignIn}>PURCHASE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('QualityHome')}>
                            <Text style={btnTextSignIn}>QUALITY CONTROL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('ReceiveHome')}>
                            <Text style={btnTextSignIn}>RECEIVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('SaleHome')}>
                            <Text style={btnTextSignIn}>SALES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('SupplierHome')}>
                            <Text style={btnTextSignIn}>SUPPLIER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('IntakeQuality')}>
                            <Text style={btnTextSignIn}>INTAKE QUALITY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn}>SIGN OUT</Text>
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
        backgroundColor: '#abd1fc',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginVertical: 20
    },
    btnSignInStyle: {
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 240,
        marginBottom: 5,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: 'black',
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
