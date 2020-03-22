import { userActionTypes } from '../actions/action.types';


export const userAuth = (phone) => ({
    type: userActionTypes.USER_AUTH,
    payload: { phone }
});

export const setUserPhone = (data) => ({
    type: userActionTypes.SET_USER_PHONE,
    payload: { phone: data.phone }
});

export const userAuth_Success = (result) => ({
    type: userActionTypes.USER_AUTH_SUCCESS,
    payload: { result }
});

export const userAuth_Fail = (error) => ({
    type: userActionTypes.USER_AUTH_FAILURE,
    payload: { error }
});

export const userVerification = (code) => ({
    type: userActionTypes.USER_VERIFICATION,
    payload: { code }
});

export const userVerification_Success = (userInfo) => ({
    type: userActionTypes.USER_VERIFICATION_SUCCESS,
    payload: { userInfo }
});

export const userVerification_Fail = (error) => ({
    type: userActionTypes.USER_VERIFICATION_FAILURE,
    payload: { error }
});