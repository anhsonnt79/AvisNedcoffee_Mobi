import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, PanResponder, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQualitySupplier extends Component {
    constructor(props){
        super(props);
        // var from_day = new Date().getDate()-1;
        // var to_day = new Date().getDate();
        // var month = new Date().getMonth() + 1;
        // var year = new Date().getFullYear();
        this.state={
            pageno: 1, data:[], seed: 1,
            loading: false,             
            refreshing: false,
            error: null,    
            // from_date: year + '/' + month + '/' + from_day,
            // to_date: year + '/' + month + '/' + to_day,
            // DateText: '',
            // DateHolder: null,  
        }
    }
    componentDidMount(){
        this.fetchDataFromApi();
    }
    
    fetchDataFromApi = ()  => {
        const { pageno, seed} = this.state;
        this.setState({ 
            loading: true,
        });
        var form = new FormData();
        form.append('pageno', pageno);
        form.append('supplier_id', this.props.navigation.state.params.supplier_id);
        form.append('from_date', this.props.navigation.state.params.fromdate); //
        form.append('to_date', this.props.navigation.state.params.todate); //        
    
    fetch(global.URL + '/stock/intake/suplier', {
        method: 'POST',
        body: form
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                data: pageno === 1 ? responseJson : [...this.state.data, ...responseJson],
                error: responseJson.error || null,
                loading: false,
                refreshing: false
            });
        })
        .catch(error => {
            this.setState({ error, loading : false });
        })
    }
    
    handleRefresh = () => {
        this.setState({ pageno: 1, refreshing: true},
            () => {
                this.fetchDataFromApi();
            }
        );
    };
    handleLoadMore = () => {
        this.setState(
            {
                pageno: this.state.pageno + 1
            },
            () => {
                this.fetchDataFromApi();
            }
        );
    };
    // _onFilter = () => {
    //     this.setState({ pageno: this.state.pageno});
    //     this.setState(
    //         {
    //             pageno: 1, refreshing: true, loading: true //, from_date: '2018/02/01'
    //         },
    //         () => {
    //             this.fetchDataFromApi();
    //         }
    //     );
    // }
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { wrapper, titlestyle, subtitleView, menuText, dong } = styles;
        return (
            <View style={wrapper}>
                {/* <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
                    <View style={styles.datePickerBox}>
                        <Text style={styles.datePickerText}>{this.state.from_date}</Text>
                    </View>
                </TouchableOpacity> */}
                    {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
                {/* <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} /> */}
                {/* <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>{params.supplier}</Text> */}
                {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <DatePicker
                        style={{width: 150}}
                        date={this.state.from_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY/MM/DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../../img/google_calendar.png')}
                        onDateChange={(date) => {this.setState({from_date: date})}}
                    />
                    <DatePicker
                        style={{width: 150}}
                        date={this.state.to_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY/MM/DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../../img/google_calendar.png')}
                        onDateChange={(date) => {this.setState({to_date: date})}}
                    />
                    <Button
                        onPress={this._onFilter}
                        title="Filter"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View> */}
            {/* <List> */}
                <FlatList
                    data={this.state.data}
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
                                    <Text style={menuText}>GRN : {item.supplier_id}</Text>
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
                    )}
                    keyExtractor={item => item.id}  
                    ListFooterComponent={this.renderFooter}                  
                    //Cặp sự kiện refresh
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    //Cặp sự kiện load more
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={-0.2}
                />
            {/* </List>             */}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff'
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