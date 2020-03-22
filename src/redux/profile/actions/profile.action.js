import { profileActionTypes } from './action.type';

////////////////// GET //////////////////////////
export const getProfileInfo = () => ({
    type: profileActionTypes.GET_PROFILE,
});

export const getProfileSuccess = (profileData) => ({
    type: profileActionTypes.GET_PROFILESUCCESS,
    payload: { profileData }
});

export const getProfileFail = (error) => ({
    type: profileActionTypes.GET_PROFILE_FAILURE,
    payload: { error }
});
////////////////// GET //////////////////////////



////////////////// UPDATE //////////////////////////
export const updateProfileInfo = (newProfileData) => ({
    type: profileActionTypes.UPDATE_PROFILE,
    payload: { newProfileData }
});

export const updateProfileSuccess = (profileData) => ({
    type: profileActionTypes.UPDATE_PROFILE_SUCCESS,
    payload: { profileData }
});

export const updateProfileFail = (error) => ({
    type: profileActionTypes.UPDATE_PROFILE_FAILURE,
    payload: { error }
});
////////////////// UPDATE //////////////////////////