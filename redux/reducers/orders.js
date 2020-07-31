import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
    orders: []
}
export default (state = initialState, action) => {
    if(action.type === ADD_ORDER){
        let updatedOrder = new Order (
            new Date.toString(),
            action.products,
            action.price,
            new Date()
        )
        return updatedOrder;
    }
    return state;
}