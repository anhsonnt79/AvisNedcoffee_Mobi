import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, TouchableOpacity, ListView, Dimensions,
        Button  } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQuality extends React.Component {
  constructor(props){
    super(props);
    var from_day = new Date().getDate()-1;
    var to_day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state={
        pageno: 1, data:[], seed: 1,
        loading: false,             
        refreshing: false,
        error: null,    
        from_date: year + '/' + month + '/' + from_day,
        to_date: year + '/' + month + '/' + to_day,
        DateText: '',
        DateHolder: null,  
    }
  }
  componentDidMount(){
    this.fetchDataFromApi();
  }

  fetchDataFromApi = ()  => {
    const { pageno, seed } = this.state;
    this.setState({ loading: true });
    var form = new FormData();
    form.append('pageno', this.state.pageno);
    // form.append('supplier_id', this.props.navigation.state.params.supplier_id);
    form.append('from_date', this.state.from_date); //
    form.append('to_date', this.state.to_date); //        

    fetch(global.URL + '/stock/intake', {
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
        pageno: 1, refreshing: true, loading: true //, from_date: '2018/02/01'
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
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
          marginTop: "3%"
        }}
      />
    );
  };

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
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
                color="red"
                // accessibilityLabel="Learn more about this purple button"
            />
        </View>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem 
                  onPress={() => navigate('IntakeQualitySupplier',
                  {supplier_id: `${item.supplier_id}`, supplier: `${item.supplier}`,
                  fromdate: this.state.from_date, todate: this.state.to_date})}
                  title={`${item.supplier}` + ' (' + `${item.total_row}` + ' row)'}
                  titleStyle={styles.titlestyle}
                  titleContainerStyle = {{ marginLeft: 10 }}
                  subtitle={<View style={styles.subtitleView}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>Balance Basis: </Text>
                    <Text style={styles.menuText}>{item.balance_basis.toLocaleString()} Kg</Text>
                  </View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>Black + Broken: </Text>
                    <Text style={styles.menuText}>{item.bb.toLocaleString()}  %</Text>
                  </View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>SC18 + SC16: </Text>
                    <Text style={styles.menuText}>{item.screen.toLocaleString()}  %</Text>
                  </View>
                </View>}            
                containerStyle={{ borderBottomWidth: 0, marginTop: 0 }}
              />
            )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}                  
              //Cặp sự kiện refresh
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              //Cặp sự kiện load more
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={-0.2}
          />
        </List>
        {/* <View><Text style={styles.locText}>Total Qty: {rowItem.toLocaleString()}</Text></View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  locText: {
    paddingLeft: 12,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 6,
    fontSize: 12
  },
  titleText: {
    fontWeight: 'bold'
  },
  restaurantImage: {
    width: 600,
    height: 800
  },
  titlestyle: {
    fontSize: 22, fontWeight: 'bold', color: 'red',
  },
  buttonNgang: {
    flexDirection: 'row',
    width: 335,
    marginTop: 10
  },
  buttonStyleRight: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#84ba87',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonStyleLeft: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#84ba87',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 3
  }
});
