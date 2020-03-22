import { stepperActions } from '../actions/action.type';

const initialState = {
    whichStep: 1
}

export default function stepperReducer(state = initialState, action) {
    switch (action.type) {
        case stepperActions.CHANGE_STEP:
            return {
                ...state,
                whichStep: action.payload
            };
        default:
            return state;
    }
};