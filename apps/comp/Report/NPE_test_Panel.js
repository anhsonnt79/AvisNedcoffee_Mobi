import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image, TouchableOpacity, ListView, Dimensions,
        Button, ScrollView  } from 'react-native';
import Panel from '../ExpandPanel/Panel';
import { List, ListItem, SearchBar, Avatar, colors } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import global from '../../global';

const { height } = Dimensions.get('window');

export default class NPE extends React.Component {
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

    fetch(global.URL + '/stock/stack', {
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
    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <Panel title={`${item.name}`}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>Unfix : </Text>
                            <Text style={styles.menuText}>{item.unfixed}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.menuText}>Link: </Text>
                            <Text style={styles.menuText}>{`${item.link_to_detail['date_order']}`}{item.link_to_detail.name}</Text>
                        </View>
                    </Panel>
                )}
                keyExtractor={item => item.id}
                // ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}                  
                //Cặp sự kiện refresh
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                //Cặp sự kiện load more
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={-0.2}
            />
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex            : 1,
        backgroundColor : '#f4f7f9',
    },
    menuText: {
        paddingLeft: 10,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 13
    },
  
});