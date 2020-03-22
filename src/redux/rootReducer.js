import { combineReducers } from 'redux';
import userReducer from './user/reducers/user.reducer';
import purchaseReducer from './purchase/reducer/purchase.reducer';
import loanReducer from './loan/reducer/loan.reducer';
import invoiceReducer from './invoice/reducer/invoice.reducer';
import profileReducer from './profile/reducer/profile.reducer';
import stepperReducer from './stepper/reducer/stepper.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    purchase: purchaseReducer,
    loan: loanReducer,
    invoice: invoiceReducer,
    profile: profileReducer,
    stepper: stepperReducer
});


export default rootReducer;