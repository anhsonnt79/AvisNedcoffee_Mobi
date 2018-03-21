import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, TouchableOpacity, ListView, Dimensions,
        Button, ScrollView  } from 'react-native';
// import DatePicker from 'react-native-datepicker';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

const { height } = Dimensions.get('window');

export default class IntakeQuality extends React.Component {
  constructor(props){
    super(props);
    // var from_day = new Date().getDate()-1;
    // var to_day = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    this.state={
        pageno: 1, data:[],
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
    const { pageno, seed } = this.state;
    this.setState({ loading: true });
    var form = new FormData();
    form.append('pageno', this.state.pageno);
    // form.append('supplier_id', this.props.navigation.state.params.supplier_id);

    fetch(global.URL + '/npe/unfixed', {
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
          width: "95%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
          // marginTop: "3%"
        }}
      />
    );
  };

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View style={{ flex:1, backgroundColor: '#ffffff'}}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem 
                  onPress={() => navigate('NPEUnfixDetail',
                  {partner_id: `${item.partner_ids}`, partner: `${item.partner}`})}
                  title={`${item.partner}`}
                  titleStyle={styles.titlestyle}
                  titleContainerStyle = {{ marginLeft: 10 }}
                  subtitle={<View style={styles.subtitleView}>
                  {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>Contract Qty.: </Text>
                    <Text style={styles.menuText}>{item.qty_contract.toLocaleString()} Kg</Text>
                  </View> */}
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>Received Qty.: </Text>
                    <Text style={styles.menuText}>{item.qty_received.toLocaleString()} Kg</Text>
                  </View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.menuText}>Unfixed Qty.: </Text>
                    <Text style={styles.menuText}>{item.unfixed.toLocaleString()} Kg</Text>
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
    fontSize: 12
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
  titlestyle: {
    fontSize: 16, fontWeight: 'bold', color: '#1F69F6',
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
