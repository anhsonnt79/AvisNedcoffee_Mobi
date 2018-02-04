
import { Platform, Alert } from 'react-native';

export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserPassword = (password) => ({
    type: 'SET_USER_PASSWORD',
    password
});

export const setAccessToken = (access_token) => ({
    type: 'SET_ACCESS_TOKEN',
    access_token
});
var FormData = require('form-data');

export const login = (username, password) => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());
        var form = new FormData();

        form.append('login', username);
        form.append('password', password);
        fetch('http://127.0.0.1:8069/auth/signin', {
          method: 'POST',
          body: form
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          if(data.errors == ""){
            dispatch(setUserName(username));
            dispatch(setUserPassword(password));
            dispatch(setAccessToken(data.access_token))
            dispatch(userAuthorized());
            gotoInventNavigator(dispatch);
          } else {
              alert(data.errors)
          }
        });

    }
}

export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(userNoExist());

        // firebase.auth()
        //         .signInAnonymously()
        //         .then(() => firebase.database()
        //                             .ref(`users/${DeviceInfo.getUniqueID()}`)
        //                             .once('value', (snapshot) => {
        //                                 const val = snapshot.val();

        //                                 if (val === null) {
        //                                     dispatch(userNoExist());
        //                                 }else{
        //                                     dispatch(setUserName(val.name));
        //                                     dispatch(setUserAvatar(val.avatar));
        //                                     startChatting(dispatch);
        //                                 }
        //                             }))
        //         .catch(err => console.log(err))
    }
}

export const startFetchingUserProfile = () => ({
    type: 'START_FETCHING_USER_PROFILE'
});



export const fetchUserProfile = () => {
    return function (dispatch) {
        dispatch(startFetchingUserProfile());
    }
}


const gotoHomeScreen = function (dispatch) {
    // dispatch(userAuthorized());
    // dispatch(fetchUserProfile());
}

const gotoInventNavigator = function (dispatch) {
    // dispatch(userAuthorized());
    // dispatch(fetchUserProfile());
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
