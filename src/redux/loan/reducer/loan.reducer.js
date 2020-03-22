import { loanActionTypes } from '../actions/action.types';

const initialState = {
    loading: false,
    error: null,
    loanUpdatedResult: [],
    loanSlices: [],
    payment_invoice: null,
}

export default function loanReducer(state = initialState, action) {
    switch (action.type) {
        case loanActionTypes.UPDATE_LOAN_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                loanUpdatedResult: [],
                loanSlices: [],
                payment_invoice: null,
            };
        case loanActionTypes.UPDATE_LOAN_START:
            return {
                ...state,
                loanUpdatedResult: [],
                loanSlices: [],
                error: null,
                loading: true,
                payment_invoice: null,
            };
        case loanActionTypes.UPDATE_LOAN_SUCCESS:
            return {
                ...state,
                loanUpdatedResult: action.payload.updateLoanResult.data,
                loanSlices: action.payload.updateLoanResult.data.slices,
                loading: false,
                error: null,
            };
        case loanActionTypes.UPDATE_LOAN_FAILURE:
            return {
                ...state,
                loading: false,
                loanUpdatedResult: [],
                loanSlices: [],
                payment_invoice: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};