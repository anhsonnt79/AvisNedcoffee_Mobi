import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, PanResponder, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import { ListItem } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQualitySupplier extends Component {
    constructor(props){
        super(props);
        var date = new Date().getDate()-2;
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.state={
            pageno: 1,            
            mang:[],
            from_date: year + '/' + month + '/' + date,
            to_date: new Date(),
            DateText: '',
            DateHolder: null,        
        }
    }

    /**
     * Textbox click listener
     */
    DatePickerMainFunctionCall = () => {
    
        let DateHolder = this.state.DateHolder;
    
        if(!DateHolder || DateHolder == null){
    
        DateHolder = new Date();
        this.setState({
            DateHolder: DateHolder
        });
        }
    
        //To open the dialog
        this.refs.DatePickerDialog.open({
    
        from_date: DateHolder,
    
        });
    
    }
    
    // /**
    //  * Call back for dob date picked event
    //  *
    //  */
    // onDatePickedFunction = (date) => {
    //     this.setState({
    //     dobDate: date,
    //     DateText: moment(date).format('YYYY-MM-DD')
    //     });
    // }
   
    render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { wrapper, titlestyle, subtitleView, menuText, dong } = styles;
        return (
            <View style={wrapper}>
                <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
                    <View style={styles.datePickerBox}>
                        <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                    </View>
                </TouchableOpacity>
                    {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
                {/* <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} /> */}
                {/* <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>{params.supplier}</Text> */}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.from_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({from_date: date})}}
                    />
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.to_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({to_date: date})}}
                    />
                </View>

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
    datePickerBox:{
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent:'center'
      },
     
      datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',
     
      },
});