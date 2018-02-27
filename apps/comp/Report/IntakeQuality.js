import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, TouchableOpacity, ListView, Dimensions } from 'react-native';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

export default class IntakeQuality extends React.Component {
  constructor(props) {
    super(props);

    this.state  = {
        pageno: 1,
        loading: false,
      data: [],
      error: null,
      refreshing: false, 
      base_url: global.URL, //"http://127.0.0.1:8069",
    }
  }

  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = ()  => {
    const url = global.URL + "/stock/intake";
    this.setState({ pageno: 1 });
    var form = new FormData();
    form.append('pageno', this.state.pageno);
    // form.append('warehouse_id', this.props.navigation.state.params.stock_id);

    this.setState({ loading: true });

    fetch(url, {
        method: 'POST',
        body: form
        })
      .then(res => res.json())
      .then(res => {
          this.setState({
            data: res,
            error: null,
            loading: false,
            refreshing: false,
          });
      })
      .catch(error => {
        this.setState({ error, loading : false });
      })
  };

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
      <View>
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem 
                onPress={() => navigate('IntakeQualitySupplier',
                {supplier_id: `${item.supplier_id}`, supplier: `${item.supplier}`})}
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
          keyExtractor={item => item.supplier_id}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
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
