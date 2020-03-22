import { stepperActions } from './action.type';

export const change_Step = (to) => ({
    type: stepperActions.CHANGE_STEP,
    payload: to
});