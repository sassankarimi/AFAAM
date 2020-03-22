import { invoiceActionTypes } from '../actions/action.types';

const initialState = {
    loading: false,
    error: null,
    invoiceResult: [],
}

export default function invoiceReducer(state = initialState, action) {
    switch (action.type) {
        case invoiceActionTypes.INVOICE_START:
            return {
                ...state,
                invoiceResult: [],
                error: null,
                loading: true,
            };
        case invoiceActionTypes.INVOICE_SUCCESS:
            return {
                ...state,
                invoiceResult: action.payload.invoiceResult.data,
                loading: false,
                error: null,
            };
        case invoiceActionTypes.INVOICE_FAILURE:
            return {
                ...state,
                loading: false,
                invoiceResult: [],
                error: action.payload.error,
            };
        default:
            return state;
    }
};