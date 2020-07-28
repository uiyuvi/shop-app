import PRODUCTS from '../../data/dummy-data'

const initialState = {
    availableProducts: PRODUCTS
}

const productsReducer = (state = initialState, action) => {
    return state;
}
export default productsReducer;