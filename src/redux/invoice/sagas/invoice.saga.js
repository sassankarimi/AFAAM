import { invoiceActionTypes } from '../actions/action.types';
import { invoiceFail, invoiceSuccess } from '../actions/invoice.actions';
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import api from '../../../config/api.json';
import server from '../../../config/server.json';

const invoiceRequest = (param) => {
    console.log(param);
    return axios.get(`${server.afaam}${api.GetInvoice}`, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } });
    // return fetch(`${server.afaam}${api.GetInvoice}?invoice_id=${param}`, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('Token')}`
    //     }
    // })
};

export function* invoice_Async(param) {
    try {
        const req_data = yield call(invoiceRequest, param.payload);
        yield put(invoiceSuccess(req_data));
    }
    catch (error) {
        yield put(invoiceFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* invoice_start() {
    yield takeLatest(
        invoiceActionTypes.INVOICE_START,
        invoice_Async
    );
};