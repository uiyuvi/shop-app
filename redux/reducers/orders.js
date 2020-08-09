import { ADD_ORDER, SET_ORDER } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
    orders: []
}
export default (state = initialState, action) => {
    if(action.type === SET_ORDER){
        return {
            orders: action.orders
        }
    }

    if (action.type === ADD_ORDER) {
        let updatedOrder = new Order(
            action.id,
            action.products,
            action.price,
            action.date
        );

        return {
            ...state,
            orders: state.orders.concat(updatedOrder)
        }
    }
return state;
}