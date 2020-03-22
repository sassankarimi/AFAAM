import { invoiceActionTypes } from './action.types';

export const invoiceStart = (param) => ({
    type: invoiceActionTypes.INVOICE_START,
    payload: param
});

export const invoiceSuccess = (invoiceResult) => ({
    type: invoiceActionTypes.INVOICE_SUCCESS,
    payload: { invoiceResult }
});

export const invoiceFail = (error) => ({
    type: invoiceActionTypes.INVOICE_FAILURE,
    payload: { error }
});