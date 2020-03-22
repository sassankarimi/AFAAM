import { loanActionTypes } from './action.types';

export const updateLoanStart = (param) => ({
    type: loanActionTypes.UPDATE_LOAN_START,
    payload: param
});

export const UpdateLoanSuccess = (updateLoanResult) => ({
    type: loanActionTypes.UPDATE_LOAN_SUCCESS,
    payload: { updateLoanResult }
});

export const UpdateLoanFail = (error) => ({
    type: loanActionTypes.UPDATE_LOAN_FAILURE,
    payload: { error }
});

export const updateLoanReset = () => ({
    type: loanActionTypes.UPDATE_LOAN_RESET,
});