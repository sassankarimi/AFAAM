import { userActionTypes } from '../actions/action.types';

const initialState = {
    phone: '',
    loading: false,
    error: null,
    result: [],
    userInfo: []
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case userActionTypes.USER_AUTH:
            return {
                ...state,
                loading: true,
                error: null,
                userInfo: [],
                result: [],
            };
        case userActionTypes.SET_USER_PHONE:
            return {
                ...state,
                loading: false,
                error: null,
                phone: action.payload.phone
            };
        case userActionTypes.USER_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                result: action.payload.result.data
            };
        case userActionTypes.USER_AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                result: [],
                error: action.payload.error
            };
        case userActionTypes.USER_VERIFICATION:
            return {
                ...state,
                loading: true,
                error: null
            };
        case userActionTypes.USER_VERIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload.userInfo.data,
                error: action.payload.error
            };
        case userActionTypes.USER_VERIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                userInfo: [],
                error: action.payload.error
            };
        default:
            return state;
    }
};