import { FETCH_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from './cart.actionTypes';

const initialState = {

}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS:
            return action.payload;
        case ADD_TO_CART:
            {
                let { name, imageUrl, price } = action.payload;
                let itemToAdd = state[name];
                if (itemToAdd) {
                    return { ...state, [name]: { imageUrl, price, qty: itemToAdd.qty + 1 } };
                }
                else {
                    return { ...state, [name]: { imageUrl, price, qty: 1 } };
                }
            }
        case REMOVE_FROM_CART:
            {
                let { name, numItems } = action.payload;
                let { imageUrl, price, qty } = state[name];
                console.log(qty,numItems)
                qty -= numItems;
                if (qty <= 0) {
                    //ie remove from cart
                    let newState = state;
                    delete (newState[name]);
                    return { ...newState };
                }
                else {
                    return { ...state, [name]: { imageUrl, price, qty } };
                }
            }
        case EMPTY_CART:
            return {};
        default:
            return state;
    }
}


export default cartReducer;

