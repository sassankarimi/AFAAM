import { loanActionTypes } from '../actions/action.types';
import { UpdateLoanFail, UpdateLoanSuccess } from '../actions/loan.actions';
import { change_Step } from '../../stepper/actions/stepper.action';
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import api from '../../../config/api.json';
import server from '../../../config/server.json';

const updateLoanRequest = (param) => {
    return axios({
        method: 'PUT',
        url: `${server.afaam}${api.UpdateLoan}?loan_id=${param.loan_id}`,
        data: {
            price: param.price,
            slice_numbers: param.slice_numbers,
            // loan_id: param.loan_id,
            accept_loan: `${param.accept_loan}`,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
    });
};

export function* updateLoan_Async(param) {
    try {
        const req_data = yield call(updateLoanRequest, param.payload);
        yield put(UpdateLoanSuccess(req_data));
        if (req_data.data.prepayment_invoice === null) {
            yield put(change_Step(2))
        } else {
            yield put(change_Step(3))
        }
    }
    catch (error) {
        yield put(UpdateLoanFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* updateLoan_start() {
    yield takeLatest(
        loanActionTypes.UPDATE_LOAN_START,
        updateLoan_Async
    );
};