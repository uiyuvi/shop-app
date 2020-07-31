import {combineReducers} from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
import orders from './orders';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orders
});

export default rootReducer;