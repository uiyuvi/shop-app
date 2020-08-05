import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.userId === "u1")
};

const productsReducer = (state = initialState, action) => {
  if (action.type === DELETE_PRODUCT) {
    const updatedAvailableProducts = state.availableProducts.filter(
      availableProduct => availableProduct.id !== action.pid
    );
    const updatedUserProducts = state.userProducts.filter(
      availableProduct => availableProduct.id !== action.pid
    );
    return {
      ...state,
      availableProducts: updatedAvailableProducts,
      userProducts: updatedUserProducts
    };
  }
  return state;
};
export default productsReducer;
