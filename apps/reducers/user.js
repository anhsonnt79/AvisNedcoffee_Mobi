const initialState = {
    name: null,
    authorizing: false,
    authorized: false,
    access_token: '',
    password: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_NAME':
            return Object.assign({}, state, {
                name: action.name
            });
        case 'SET_USER_PASSWORD':
            return Object.assign({}, state, {
                password: action.password
            });

        case 'SET_ACCESS_TOKEN':
          return Object.assign({}, state, {
            access_token: action.access_token
          });
        case 'USER_START_AUTHORIZING':
            return Object.assign({}, state, {
                authorizing: true
            });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: true
            });
        case 'USER_NO_EXIST':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false
            });

        default:
            return state
    }
}

export default user;