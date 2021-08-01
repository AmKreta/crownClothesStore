//importing actions
import { FETCH_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from './cart.actionTypes';

export const fetchCartItems = (/*userId*/) => {
    return { type: FETCH_CART_ITEMS }
}

export const addToCart = ({ name, price, imageUrl }) => {
    return { type: ADD_TO_CART, payload: { name, price, imageUrl } };
}

export const removeFromCart = ({ name, numItems = 1 }) => {
    console.log(numItems)
    return { type: REMOVE_FROM_CART, payload: { name, numItems } };
}

export const emptyCart = () => {
    return { type: EMPTY_CART };
}