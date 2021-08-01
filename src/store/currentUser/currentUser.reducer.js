import { UPDATE_CURRENT_USER, REMOVE_CURRENT_USER } from './currentUser.actionTypes';

const initialState = {};

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER: return action.payload;
        case REMOVE_CURRENT_USER: return ({});
        default: return state;
    }
}

export default currentUserReducer;