import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";
import Product from "../../models/product";

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

  if(action.type === CREATE_PRODUCT){
      const newProduct = new Product(
          new Date().toString(),
          "u1",
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          action.productData.price
      );
      return {
          ...state,
          availableProducts : state.availableProducts.concat(newProduct),
          userProducts : state.userProducts.concat(newProduct)
      }
  }

  if(action.type === UPDATE_PRODUCT){
    console.log(action);
    const userProductIndex = state.userProducts.findIndex(product => product.id === action.productId);
    const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].userId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
    );   
    let updatedUserProducts = [...state.userProducts];
    updatedUserProducts[userProductIndex] = updatedProduct;

    const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productId);   
    let updatedAvailableProducts = [...state.availableProducts];
    updatedAvailableProducts[availableProductIndex] = updatedProduct;
    return {
        ...state,
        availableProducts : updatedAvailableProducts,
        userProducts : updatedUserProducts
    }
  }

  return state;
};
export default productsReducer;
