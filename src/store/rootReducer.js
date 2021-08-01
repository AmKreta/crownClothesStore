import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cart from './cart/cart.reducer';
import currentUser from './currentUser/currentUser.reducer';
import shopCategory from './shopCategory/shopCategory.reducer';
import shopData from './shopData/shopData.reducer';

const rootReducer = combineReducers({
    cart,
    currentUser,
    shopCategory,
    shopData
});

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart']
}

export default persistReducer(persistConfig, rootReducer);