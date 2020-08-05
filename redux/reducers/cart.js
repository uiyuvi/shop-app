import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  products: {},
  totalPrice: 0
};
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
      productAboutToAdd = new CartItem(
        1,
        productPrice,
        productTitle,
        productPrice
      );
    }
    updatedCart = {
      ...state,
      products: { ...state.products, [product.id]: productAboutToAdd },
      totalPrice: parseFloat((state.totalPrice + productPrice).toFixed(2))
    };
    return updatedCart;
  }

  if (action.type === REMOVE_FROM_CART) {
    const productTobeRemoved = state.products[action.productId];
    let updatedProducts;
    if (productTobeRemoved.quantity > 1 && action.quantity === 1) {
      let updatedItem = new CartItem(
        productTobeRemoved.quantity - 1,
        productTobeRemoved.price,
        productTobeRemoved.title,
        productTobeRemoved.sum - productTobeRemoved.price
      );
      updatedProducts = { ...state.products, [action.productId]: updatedItem };
    } else {
      updatedProducts = { ...state.products };
      delete updatedProducts[action.productId];
    }
    return {
      ...state,
      products: updatedProducts,
      totalPrice: parseFloat(
        (state.totalPrice - productTobeRemoved.price * action.quantity).toFixed(
          2
        )
      )
    };
  }

  if (action.type === ADD_ORDER) {
    return initialState;
  }

  if (action.type === DELETE_PRODUCT) {
    if (!state.products[action.pid]) {
      return state;
    }
    console.log("deleteproduct");

    let updatedProducts = { ...state.products };
    let itemToBeRemovedSum = 0;
    console.log(state.products[action.pid]);

    itemToBeRemovedSum = state.products[action.pid].sum;
    delete updatedProducts[action.pid];

    console.log(updatedProducts);

    return {
      ...state,
      products: updatedProducts,
      totalPrice: parseFloat((state.totalPrice - itemToBeRemovedSum).toFixed(2))
    };
  }

  return state;
};
export default cartReducer;
