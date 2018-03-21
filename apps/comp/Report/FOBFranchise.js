import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, TouchableOpacity, ListView, Dimensions,
        Button, ScrollView  } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

const { height } = Dimensions.get('window');

export default class FOBFranchise extends React.Component {
  constructor(props){
    super(props);
    var from_day = '01';
    var to_day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state={
        pageno: 1, data:[],
        loading: false,             
        refreshing: false,
        error: null,    
        from_date: year + '/' + month + '/' + from_day,
        to_date: year + '/' + month + '/' + to_day,
    }
  }
  componentDidMount(){
    this.fetchDataFromApi();
  }

  fetchDataFromApi = ()  => {
    const pageno = this.state;
    this.setState({ loading: true });
    var form = new FormData();
    form.append('pageno', this.state.pageno);
    form.append('from_date', this.state.from_date); //
    form.append('to_date', this.state.to_date); //        

    fetch(global.URL + '/outbound/fobfranchise', {
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
  _onFilter = () => {
    this.setState({ pageno: this.state.pageno});
    this.setState(
      {
        pageno: 1, refreshing: true, loading: true, data:[], //, from_date: '2018/02/01'
      },
      () => {
        this.fetchDataFromApi();
      }
    );
  }
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
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        //   marginTop: "3%"
        }}
      />
    );
  };

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View style={styles.wrapper}>
        {/* <ScrollView style={{flex:1}} > */}
          <View style={{height: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
            <DatePicker
                style={{width: 150}}
                date={this.state.from_date}
                mode="date"
                placeholder="select date"
                format="YYYY/MM/DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../../img/date_icon.png')}
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
                iconSource={require('../../img/date_icon.png')}
                onDateChange={(date) => {this.setState({to_date: date})}}
            />
            <Button
                onPress={this._onFilter}
                title="Filter"
                color="red"
                // accessibilityLabel="Learn more about this purple button"
            />
          </View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: '#57DAFF' }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <View style={styles.productStyle}>
                <View style={[styles.mainRight]}>
                  <ListItem 
                    //   onPress={() => navigate('IntakeQualitySupplier',
                    //   {supplier_id: `${item.supplier_id}`, supplier: `${item.supplier}`,
                    //   fromdate: this.state.from_date, todate: this.state.to_date})}
                        title={`${item.customer}`}
                        titleStyle={styles.titlestyle}
                        titleContainerStyle = {{ marginLeft: 10 }}
                        subtitle={<View style={styles.subtitleView}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 0.5, borderTopWidth:0 }}>                      
                            <View style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                                <Text style={styles.menuText}>Factory ETD: </Text>
                                <Text style={styles.menuText}>{item.factory_etd} </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                                <Text style={styles.menuText}> SI: </Text>
                                <Text style={styles.menuText}> {item.si_name} </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                                <Text style={styles.menuText}> Product: </Text>
                                <Text style={styles.menuText}> {item.product_name} </Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>{item.description} </Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>Product Qty (Kg): </Text>
                            <Text style={styles.menuText}>{item.product_qty.toLocaleString()} Kg</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>Weightbridge Qty (Kg): </Text>
                            <Text style={styles.menuText}>{item.gdn_weighbridge_qty.toLocaleString()} Kg</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>Franchise: </Text>
                            <Text style={styles.menuText}>{item.franchise.toLocaleString()}  %</Text>
                        </View>
                    </View>}            
                    containerStyle={{ borderBottomWidth: 0, marginTop: 0 }}
                  />
                </View>
              </View>
            )}
              keyExtractor={item => item.newid}
              // ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}                  
              //Cặp sự kiện refresh
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              //Cặp sự kiện load more
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={-0.2}
          />
        </List>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#57DAFF'
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
  mainRight: {
    flex: 3,
    justifyContent: 'space-between'
  },
  subtitleView: {
    flexDirection: 'column',
    // paddingLeft: 5,
    paddingTop: 5,
    // marginLeft: 40
  },
  menuText: {
    // paddingLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 13
  },
  titlestyle: {
    fontSize: 18, fontWeight: 'bold', color: 'red',
  },
});
