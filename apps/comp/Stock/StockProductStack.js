import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, Alert, ListView, 
    Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class StockProductStack extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            pageno: 1,
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2}),
            refreshing: false,
        }
    }
    componentDidMount(){
        this.fetchDataFromApi();
    }
  
    fetchDataFromApi = ()  => {
        var form = new FormData();
        form.append('warehouse_id', this.props.navigation.state.params.stock_id);
        form.append('product_id', this.props.navigation.state.params.product_id);
        form.append('pageno', this.state.pageno);

        fetch(global.URL + '/stock/product/stack', {
            method: 'POST',
            body: form
            })
            .then((response) => response.json())
            .then((responseJson) => {
                mang=responseJson;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(mang),
                    refreshing: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onEndReached(){
        var form = new FormData();
        form.append('warehouse_id', this.props.navigation.state.params.stock_id);
        form.append('product_id', this.props.navigation.state.params.product_id);
        form.append('pageno', this.state.pageno + 1);
        
        fetch(global.URL + '/stock/product/stack', {
            method: 'POST',
            body: form
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length != 0){
                    mang=mang.concat(responseJson);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(mang),
                        pageno: this.state.pageno + 1,
                        refreshing: false,
                    });
                }
                // else {
                //     Alert.alert(
                //         'Alert Messenge',
                //         'End of data !',
                //         [
                //           {text: 'OK', onPress: () => console.log('OK Pressed')},
                //         ],
                //     )
                // }
            })
            .catch((error) => {
                console.error(error);
            });        
    }
    handleRefresh = () => {
        this.setState(
          {
            refreshing: true
          },
          () => {
            this.fetchDataFromApi();
          }
        );
      };

      render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer, labelLeft, labelRight, txtQty } = styles;
        return (
            <View style={wrapper}>
                <Text style={{color: '#b5139a', fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>
                {params.stockname}: Product {params.product_name}</Text>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh.bind(this)}
                        />
                        }
                    onEndReached={this._onEndReached.bind(this)} onEndReachedThreshold={3}                    
                    dataSource={this.state.dataSource}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=> (
                        <View style={productStyle}>
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={labelLeft}>ZONE: {rowData.zone_name}</Text>
                                    <Text style={labelRight}>{rowData.stack}</Text>                                    
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: '#444f45' }}>Date:</Text>
                                    <Text style={txtName}>{rowData.date}</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: '#444f45' }}>Packing:</Text>
                                    <Text style={txtName}>{rowData.packing_type}</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: 'black', fontSize: 14 }}>Balance Net:</Text>
                                    <Text style={txtQty}>{rowData.init_qty.toLocaleString()} Kg</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: 'black', fontSize: 14 }}>Bags Qty:</Text>
                                    <Text style={txtQty}>{rowData.bag_qty.toLocaleString()}     </Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: 'black', fontSize: 14 }}>Black + Broken: </Text>
                                    <Text style={txtQty}>{rowData.bb.toLocaleString()}  %</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: 'black', fontSize: 14 }}>MC: </Text>
                                    <Text style={txtQty}>{rowData.mc.toLocaleString()}  %</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Avenir', color: 'black', fontSize: 14 }}>FM: </Text>
                                    <Text style={txtQty}>{rowData.fm.toLocaleString()}  %</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#d4f7fc'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        fontFamily: 'Avenir',
        color: '#444f45'
    },
    txtQty: {
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    labelLeft: {
        fontSize: 20, fontWeight: 'bold', color: 'red'
    },
    labelRight: {
        fontSize: 20, fontWeight: 'bold', color: 'blue'
    },
});