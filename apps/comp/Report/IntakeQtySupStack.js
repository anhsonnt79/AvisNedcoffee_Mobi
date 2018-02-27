import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ListItem } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQtySupStack extends Component {
    constructor(props){
        super(props);
        this.state={
            pageno: 1,            
            mang:[],
        }
    }
    render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { wrapper, titlestyle, subtitleView, menuText, viewline, dong } = styles;
        return (
            <View style={wrapper}>
            <FlatList
                data={this.state.mang}
                renderItem={({ item }) => (
                    <View style={subtitleView}>
                        <View style={viewline}>
                            <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>{item.supplier} : </Text>
                            <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>{item.stack}</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>GRN : </Text>
                            <Text style={menuText}>{item.grn}</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Receipt Qty: </Text>
                            <Text style={menuText}>{item.balance_basis.toLocaleString()} Kg</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>MC : </Text>
                            <Text style={menuText}>{item.mc.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>FM : </Text>
                            <Text style={menuText}>{item.fm.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Black : </Text>
                            <Text style={menuText}>{item.black.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Broken : </Text>
                            <Text style={menuText}>{item.broken.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Brown : </Text>
                            <Text style={menuText}>{item.brown.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Mold : </Text>
                            <Text style={menuText}>{item.mold.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Cherry : </Text>
                            <Text style={menuText}>{item.cherry.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Excelsa : </Text>
                            <Text style={menuText}>{item.excelsa.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Screen18 : </Text>
                            <Text style={menuText}>{item.screen18.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Screen16 : </Text>
                            <Text style={menuText}>{item.screen16.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Screen13 : </Text>
                            <Text style={menuText}>{item.screen13.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Screen12 : </Text>
                            <Text style={menuText}>{item.greatersc12.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Below SC12 : </Text>
                            <Text style={menuText}>{item.belowsc12.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Burned : </Text>
                            <Text style={menuText}>{item.burned.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Eaten : </Text>
                            <Text style={menuText}>{item.eaten.toLocaleString()}  %</Text>
                        </View>
                        <View style={viewline}>
                            <Text style={menuText}>Immature : </Text>
                            <Text style={menuText}>{item.immature.toLocaleString()}  %</Text>
                        </View>
                    </View>          
                )}
                keyExtractor={item => item.grn}                    
            />
            </View>
        );
    }

    componentDidMount(){
        var form = new FormData();
        form.append('pageno', this.state.pageno);
        form.append('supplier_id', this.props.navigation.state.params.supplier_id);
        form.append('stack_id', this.props.navigation.state.params.stack_id);
        form.append('grn_name', this.props.navigation.state.params.grn_name);
        // form.append('from_date', this.props.navigation.state.params.from_date);
        // form.append('to_date', this.props.navigation.state.params.to_date);

        fetch(global.URL + '/stock/intake/stack', {
            method: 'POST',
            body: form
            })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                mang: responseJson
            });
        })
        .catch((e)=>{console.log(e)});
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#d4f7fc'
    },
    titlestyle: {
        fontSize: 22, fontWeight: 'bold', color: 'red',
    },
    subtitleView: {
        flexDirection: 'column',
        padding: 10,
        // paddingTop: 5,
        // marginLeft: 40
    },
    menuText: {
        paddingLeft: 20,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16
    },
    viewline: { 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        borderBottomWidth: 0.5,
        borderTopWidth:0
    },
    dong: {
        borderBottomWidth: 1, padding: 10, borderRightWidth: 1
    },
});