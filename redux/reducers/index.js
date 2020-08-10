import {combineReducers} from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
import orders from './orders';
import { authReducer } from './auth';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: orders
});

export default rootReducer;