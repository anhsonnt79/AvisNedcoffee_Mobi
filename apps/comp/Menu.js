import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import profileIcon from '../img/profile.png';
import { StackNavigator } from 'react-navigation';
import Accordion from './ExpandMenu/Accordion';

// const SECTIONS = [
//   {
//     title: 'Quality',
//     content: 'NPE Unfix',
//     content1: 'Intake quality'
//   },
//   {
//     title: 'Second',
//     content: 'Lorem ipsum...'
//   }
// ];

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
    // _navigateControl(formname) {
    //     const { navigate } = this.props.navigation;
    //     navigate(formname);
    // }

    // _renderHeader(section) {
    //     return (
    //       <View style={styles.btnSignInStyle}>
    //         <Text style={styles.btnTextSignIn}>{section.title}</Text>
    //       </View>
    //     );
    //   }
    
    // _renderContent(section) {
    //     const { navigate } = this.props.navigation;
    //     return (
    //         <View style={styles.content}>
    //             <TouchableOpacity style={styles.btnSignInStyle} onPress={() => navigate('Main')}>
    //                 <Text style={styles.btnTextSignIn}>DASHBOARD</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={styles.btnSignInStyle} onPress={() => navigate('StockHome')}>
    //                 <Text style={styles.btnTextSignIn}>INVENTORY</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    //   }
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
                            <Text style={btnTextSignIn}>INVENTORY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('TabIntakeNpe')}>
                            <Text style={btnTextSignIn}>QUALITY</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('QualityHome')}>
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
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={btnSignInStyle} onPress={() => navigate('IntakeQuality')}>
                            <Text style={btnTextSignIn}>QUALITY INTAKE</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={btnSignInStyle}>
                            <Text style={btnTextSignIn}>SIGN OUT</Text>
                        </TouchableOpacity> */}
                        {/* <Accordion
                            sections={SECTIONS}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        /> */}
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
        width: 90,
        height: 90,
        borderRadius: 45,
        marginVertical: 20
    },
    btnSignInStyle: {
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 200,
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


// export default class Menu extends Component {
//     render() {
//       return (  //Step 2
//         <ScrollView style={styles.container}>
//           <Panel title="A Panel with short content text">
//             <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
//           </Panel>
//           <Panel title="A Panel with long content text">
//             <Text>Lorem ipsum...</Text>
//           </Panel>
//           <Panel title="Another Panel">
//             <Text>Lorem ipsum dolor sit amet...</Text>
//           </Panel>
//         </ScrollView>
//       );
//     }
//   }
  
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f4f7f9',
//       paddingTop: 30
//     },
    
//   });