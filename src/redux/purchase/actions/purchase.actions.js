import { purchaseActionTypes } from './action.types';
////////////////////////new///////////////////////////////////
export const startPurchase = (productInformations) => ({
    type: purchaseActionTypes.PURCHASE_START,
    payload: { productInformations }
});


export const purchaseSuccess = (purchaseResult) => ({
    type: purchaseActionTypes.PURCHASE_SUCCESS,
    payload: { purchaseResult }
});


export const purchaseFail = (error) => ({
    type: purchaseActionTypes.PURCHASE_FAILURE,
    payload: { error }
});
////////////////////////////////////////////////////////////



////////////////////////update///////////////////////////////////
export const updatePurchase = (productInformations) => ({
    type: purchaseActionTypes.PURCHASE_UPDATE,
    payload: { productInformations }
});


export const updatePurchaseSuccess = (purchaseResult) => ({
    type: purchaseActionTypes.PURCHASE_UPDATE_SUCCESS,
    payload: { purchaseResult }
});


export const updatePurchaseFail = (error) => ({
    type: purchaseActionTypes.PURCHASE_UPDATE_FAILURE,
    payload: { error }
});
////////////////////////////////////////////////////////////