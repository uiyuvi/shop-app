import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    products: {},
    totalPrice: 0
}
const cartReducer = (state = initialState, action) => {
    if (action.type === ADD_TO_CART) {
        const { product } = action;
        const { price: productPrice, title: productTitle } = product;
        let updatedCart = { ...state };
        let productAboutToAdd;
        if (state.products[product.id]) {
            productAboutToAdd = new CartItem(
                state.products[product.id].quantity + 1,
                productPrice,
                productTitle,
                state.products[product.id].sum + productPrice
            );
        } else {
            productAboutToAdd = new CartItem(1, productPrice, productTitle, productPrice)
        }
        updatedCart = {
            ...state,
            products: { ...state.products, [product.id]: productAboutToAdd },
            totalPrice: parseFloat((state.totalPrice + productPrice).toFixed(2))
        }
        return updatedCart;
    }

    if (action.type === REMOVE_FROM_CART) {
        const productTobeRemoved = state.products[action.productId];
        let updatedCartItems;
        if (productTobeRemoved.quantity > 1 && action.quantity === 1) {
            let updatedItem = new CartItem(
                productTobeRemoved.quantity - 1,
                productTobeRemoved.price,
                productTobeRemoved.title,
                productTobeRemoved.sum - productTobeRemoved.price
            )
            updatedCartItems = { ...state.products, [action.productId]: updatedItem }
        } else {
            updatedCartItems = { ...state.products }
            delete updatedCartItems[action.productId];
        }
        updatedCartItems = {
            ...state,
            items: updatedCartItems,
            totalPrice: parseFloat((state.totalPrice - (productTobeRemoved.price * action.quantity)).toFixed(2))
        }
        return updatedCartItems;
    }

    if (action.type === ADD_ORDER) {
        return initialState;
    }

    return state;
};
export default cartReducer;