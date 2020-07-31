import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
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
            totalPrice: parseFloat((state.totalPrice + productPrice).toFixed(2))
        }
        return updatedCart;
    }

    if (action.type === REMOVE_FROM_CART) {
        const productTobeRemoved = state.items[action.productId];
        let updatedCartItems;
        if (productTobeRemoved.quantity > 1 && action.quantity === 1) {
            let updatedItem = new CartItem(
                productTobeRemoved.quantity - 1,
                productTobeRemoved.price,
                productTobeRemoved.title,
                productTobeRemoved.sum - productTobeRemoved.price
            )
            updatedCartItems = { ...state.items, [action.productId]: updatedItem }
        } else {
            updatedCartItems = { ...state.items }
            delete updatedCartItems[action.productId];
        }
        updatedCartItems = {
            ...state,
            items: updatedCartItems,
            totalPrice: parseFloat((state.totalPrice - (productTobeRemoved.price * action.quantity)).toFixed(2))
        }
        return updatedCartItems;
    }
    return state;
};
export default cartReducer;