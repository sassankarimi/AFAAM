import { purchaseSuccess, purchaseFail, updatePurchaseSuccess, updatePurchaseFail } from '../actions/purchase.actions';
import { purchaseActionTypes } from '../actions/action.types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { change_Step } from '../../stepper/actions/stepper.action';
import { updateLoanReset } from '../../loan/actions/loan.actions';
import axios from 'axios';
import api from '../../../config/api.json';
import server from '../../../config/server.json';

////////////////////////new//////////////////////////////////
export const sendPurchaseRequest = (purchaseInfo) => {
    const { productName, storeName, productPrice } = purchaseInfo.payload.productInformations
    return axios({
        method: 'post',
        url: `${server.afaam}${api.CreatePurchase}`,
        data: {
            product_name: productName,
            store_name: storeName,
            price: productPrice
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
    });
};

export function* purchase_async(purchaseInfo) {
    try {
        const purchaseResult = yield call(sendPurchaseRequest, purchaseInfo);
        yield put(purchaseSuccess(purchaseResult));
        yield put(change_Step(2));
    }
    catch (error) {
        yield put(purchaseFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* purchase_begin() {
    yield takeLatest(
        purchaseActionTypes.PURCHASE_START,
        purchase_async
    );
};
//////////////////////////////////////////////////////////



////////////////////////update//////////////////////////////////
export const sendUpdatePurchaseRequest = (purchaseInfo) => {
    const { productName, storeName, productPrice, purchaseID } = purchaseInfo.payload.productInformations
    return axios({
        method: 'put',
        url: `${server.afaam}${api.UpdatePurchase}?purchase_id=${purchaseID}`,
        data: {
            product_name: productName,
            store_name: storeName,
            price: productPrice
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
    });
};

export function* update_purchase_async(purchaseInfo) {
    try {
        const updatePurchaseResult = yield call(sendUpdatePurchaseRequest, purchaseInfo);
        yield put(updatePurchaseSuccess(updatePurchaseResult));
        yield put(updateLoanReset());
        yield put(change_Step(2));
    }
    catch (error) {
        yield put(updatePurchaseFail(error));
        if (error.response.data.detail) {
            yield alert(error.response.data.detail);
        } else {
            yield alert(error.message);
        }
    }
};

export function* update_purchase_begin() {
    yield takeLatest(
        purchaseActionTypes.PURCHASE_UPDATE,
        update_purchase_async
    );
};
//////////////////////////////////////////////////////////