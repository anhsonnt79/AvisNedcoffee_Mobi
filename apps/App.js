import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import LoginScreen from './auth/LoginScreen';
import CompNavigator from './comp/CompNavigator';
import rootReducer from './reducers';

import { checkUserExists } from './actions/user';


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

const LoginOrHome = connect(
  (state) => ({
      authorized: state.user.authorized
  })
)(({ authorized, dispatch }) => {
    console.log(authorized);
    if (authorized) {
        return (<CompNavigator />);
    }else{
        dispatch(checkUserExists());
        return (<LoginScreen />);
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
               <LoginOrHome />
            </Provider>
        );
    }
}
