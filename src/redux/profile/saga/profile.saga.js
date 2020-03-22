import { profileActionTypes } from '../actions/action.type';
import {
    getProfileSuccess,
    getProfileFail,
    updateProfileFail,
    updateProfileSuccess
} from '../actions/profile.action';
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import api from '../../../config/api.json';
import server from '../../../config/server.json';


////////////////// GET //////////////////////////
export const getProfileInfo_Fetch = () => {
    let token = `Bearer ${localStorage.getItem('Token')}`;
    return axios.get(`${server.afaam}${api.GetUser}`, { headers: { Authorization: token } });
};

export function* getProfileInfo_Async() {
    try {
        const profileData = yield call(getProfileInfo_Fetch);
        yield put(getProfileSuccess(profileData));
    }
    catch (error) {
        yield put(getProfileFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* getProfileInfo_Start() {
    yield takeLatest(
        profileActionTypes.GET_PROFILE,
        getProfileInfo_Async
    );
};
////////////////// GET //////////////////////////



////////////////// UPDATE //////////////////////////
export const updateProfileInfo_Fetch = (newData) => {
    let token = `Bearer ${localStorage.getItem('Token')}`;
    return (axios({
        method: 'put',
        url: `${server.afaam}${api.GetUser}`,
        headers: {
            Authorization: token
        },
        data: newData
    }));
};

export function* updateProfileInfo_Async(newData) {
    const newProfileData = newData.payload.newProfileData;//value recieve from saga's action
    try {
        yield call(updateProfileInfo_Fetch, newProfileData);
        yield put(updateProfileSuccess(newProfileData));
    }
    catch (error) {
        yield put(updateProfileFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* updateProfileInfo_Start() {
    yield takeLatest(
        profileActionTypes.UPDATE_PROFILE,
        updateProfileInfo_Async
    );
};
////////////////// UPDATE //////////////////////////