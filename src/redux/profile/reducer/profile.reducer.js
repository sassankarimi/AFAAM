import { profileActionTypes } from '../actions/action.type';

const initialState = {
    loading: false,
    error: null,
    profileData: []
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case profileActionTypes.GET_PROFILE:
            return {
                ...state,
                loading: true,
                error: null,
                profileData: []
            };
        case profileActionTypes.GET_PROFILESUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                profileData: action.payload.profileData.data
            };
        case profileActionTypes.GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                profileData: []
            };
        case profileActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case profileActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case profileActionTypes.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}