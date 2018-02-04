import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { setUserName, setUserPassword, login } from '../actions/user';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing
});
// export default 
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

  }

  render() {
    const { container, logo } = styles;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.LogoContainer}>
          {/* <Image source={require('../img/LogoNED.png')} style={styles.logo} /> */}
          {/* <Text style={styles.title}>Welcome to NEDCOFFEE</Text> */}
          <View style={styles.inputContainer}>
            <TextInput 
              // underlineColorAndroid='transparent' 
              returnKeyType='next'
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
              onSubmitEditing={() => this.passwordInput.focus()}
              autoFocus={true}
              keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
              style={styles.input} 
              placeholder='Your email address'></TextInput>
            <TextInput secureTextEntry={true} underlineColorAndroid='transparent' returnKeyType='go'
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              ref={(input) => this.passwordInput = input}
              style={styles.input} 
              placeholder='Your password'></TextInput>
            <Button onPress={this.onLogin} styleName="secondary"  title="SIGN IN" color="#841584"/>
              {/* <Text>SIGN IN</Text>
            </Button> */}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
  onLogin = () => {
    this.props.dispatch(login(this.state.username, this.state.password));
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vcentered: {
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: 'center',
    flexGrow: 1,
  },
  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  logo: {
    width: 250,
    height: 70,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {with: 2, height: 2},
    textShadowRadius: 15,
    marginTop: 10,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 5,
    padding: 10,
    paddingBottom: 0,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    fontStyle: 'italic',
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 0.7
    // backgroundColor: 'rgba(255,255,255,1)',   
    // borderRadius: 20, 
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
    },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default connect(mapStateToProps)(LoginScreen);