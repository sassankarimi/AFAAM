import { purchaseActionTypes } from '../actions/action.types';

const initialState = {
    purchaseResult: [],
    loading: false,
    error: null
}

export default function purchaseReducer(state = initialState, action) {
    switch (action.type) {
        case purchaseActionTypes.PURCHASE_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case purchaseActionTypes.PURCHASE_SUCCESS:
            return {
                ...state,
                purchaseResult: action.payload.purchaseResult.data,
                loading: false,
                error: null
            };
        case purchaseActionTypes.PURCHASE_FAILURE:
            return {
                ...state,
                purchaseResult: [],
                loading: false,
                error: action.payload.error
            };
        case purchaseActionTypes.PURCHASE_UPDATE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case purchaseActionTypes.PURCHASE_UPDATE_SUCCESS:
            return {
                ...state,
                purchaseResult: action.payload.purchaseResult.data,
                loading: false,
                error: null
            };
        case purchaseActionTypes.PURCHASE_UPDATE_FAILURE:
            return {
                ...state,
                purchaseResult: [],
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}