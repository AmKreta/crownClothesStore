import { UPDATE_CURRENT_USER, REMOVE_CURRENT_USER } from './currentUser.actionTypes';

export const updateCurrentUser = (userInfo) => {
    return { type: UPDATE_CURRENT_USER, payload: userInfo };
}

export const removeCurrentUser = () => {
    return { type: REMOVE_CURRENT_USER };
}