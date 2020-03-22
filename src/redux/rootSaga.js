import { call, all } from 'redux-saga/effects';
import { userAuthSaga, userVerifySaga } from './user/sagas/user.sagas';
import { purchase_begin , update_purchase_begin } from './purchase/sagas/purchase.saga';
import { updateLoan_start } from './loan/sagas/loan.saga';
import { invoice_start } from './invoice/sagas/invoice.saga';
import { getProfileInfo_Start ,updateProfileInfo_Start } from './profile/saga/profile.saga';

export default function* rootSaga() {
    yield all(
        [
            call(userAuthSaga),
            call(userVerifySaga),
            call(purchase_begin),
            call(updateLoan_start),
            call(invoice_start),
            call(getProfileInfo_Start),
            call(updateProfileInfo_Start),
            call(update_purchase_begin),
        ]
    );
};