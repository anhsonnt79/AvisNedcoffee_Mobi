import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ListItem } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQualitySupplier extends Component {
    constructor(props){
        super(props);
        this.state={
            pageno: 1,            
            mang:[],
        }
    }
    render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { wrapper, titlestyle, subtitleView, menuText, dong } = styles;
        return (
            <View style={wrapper}>
                <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>{params.supplier}</Text>
                <FlatList
                    data={this.state.mang}
                    renderItem={({ item }) => (
                    <ListItem 
                        onPress={() => navigate('IntakeQtySupStack',
                        {supplier_id: `${item.supplier_id}`, supplier: `${item.supplier}`,
                        stack_id: `${item.stack_id}`, grn_name: `${item.grn}`})}
                        title={`${item.stack_name}`}
                        titleStyle={titlestyle}
                        titleContainerStyle = {{ marginLeft: 10 }}
                        subtitle={<View style={subtitleView}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={menuText}>GRN : </Text>
                                <Text style={menuText}>{item.grn}</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={menuText}>Balance Basis: </Text>
                                <Text style={menuText}>{item.balance_basis.toLocaleString()} Kg</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={menuText}>Black + Broken: </Text>
                                <Text style={menuText}>{item.bb.toLocaleString()}  %</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={menuText}>SC18 + SC16: </Text>
                                <Text style={menuText}>{item.screen.toLocaleString()}  %</Text>
                            </View>
                        </View>}            
                    containerStyle={{ borderBottomWidth: 0, marginTop: 0 }}
                    />
                        // <View style={dong}>
                        //     <Text>STACK : {item.stack_name}</Text>
                        //     <Text>GRN : {item.grn}</Text>
                        //     <Text>BALANCE BASIS : {item.balance_basis}</Text>
                        //     <Text>{item.bb}</Text>
                        //     <Text>{item.screen}</Text>
                        // </View>
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

        fetch(global.URL + '/stock/intake/suplier', {
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
        paddingLeft: 10,
        paddingTop: 5,
        // marginLeft: 40
    },
    menuText: {
        paddingLeft: 10,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16
    },
    dong: {
        borderBottomWidth: 1, padding: 10, borderRightWidth: 1
    },
});