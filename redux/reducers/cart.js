import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalPrice: 0
}
const cartReducer = (state = initialState, action) => {
    if (action.type === ADD_TO_CART) {
        const { product } = action;
        const { price: productPrice, title: productTitle } = product;
        let updatedCart = { ...state };
        let productAboutToAdd;
        if (state.items[product.id]) {
            productAboutToAdd = new CartItem(
                state.items[product.id].quantity + 1,
                productPrice,
                productTitle,
                state.items[product.id].sum + productPrice
            );
        } else {
            productAboutToAdd = new CartItem(1, productPrice, productTitle, productPrice)
        }
        updatedCart = {
            ...state,
            items: { ...state.items, [product.id]: productAboutToAdd },
            totalPrice: state.totalPrice + productPrice
        }
        return updatedCart;
    }
    return state;
};
export default cartReducer;