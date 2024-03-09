import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    navigateUrl: '/system',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                navigateUrl: '/',
            };

        case actionTypes.SET_NAVIGATE_URL:
            return {
                ...state,
                navigateUrl: action.url,
            };

        default:
            return state;
    }
};

export default userReducer;
