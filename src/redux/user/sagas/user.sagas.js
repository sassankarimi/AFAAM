import { takeLatest, put, call } from 'redux-saga/effects';
import { userActionTypes } from '../actions/action.types';
import {
    userAuth_Success,
    userAuth_Fail,
    userVerification_Fail,
    userVerification_Success,
    setUserPhone
} from '../actions/user.actions';
import api from '../../../config/api.json';
import server from '../../../config/server.json';
import axios from 'axios';

////////////////////// USER AUTH ////////////////////////
export const userAuthRequest = (data) => {
    return axios.post(`${server.afaam}${api.UserAuthentication}`, data);
}

export function* userAuthAsync(data) {
    console.log(data);
    try {
        const userAuthResult = yield call(userAuthRequest, data.payload.phone);
        yield put(setUserPhone(data.payload.phone));
        yield put(userAuth_Success(userAuthResult));
    }
    catch (error) {
        yield put(userAuth_Fail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* userAuthSaga() {
    yield takeLatest(
        userActionTypes.USER_AUTH,
        userAuthAsync
    );
};
////////////////////////////////////////////////////////


////////////////////// USER VERIFY ////////////////////
export const userVerifyRequest = (inputs) => {
    return axios.post(`${server.afaam}${api.UserVerification}`, inputs)
};

export function* userVerifyAsync(actionData) {
    try {
        const userInfo = yield call(userVerifyRequest, actionData.payload.code);
        yield put(userVerification_Success(userInfo));
        localStorage.setItem('name',userInfo.data.first_name + " " + userInfo.data.last_name);
        localStorage.setItem('phone',userInfo.data.phone);
        localStorage.setItem('crl',userInfo.data.current_loans);
    }
    catch (error) {
        yield put(userVerification_Fail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* userVerifySaga() {
    yield takeLatest(
        userActionTypes.USER_VERIFICATION,
        userVerifyAsync
    );
};
////////////////////////////////////////////////////////