import React from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import OrderItem from "../components/OrderItem";

const OrderScreen = () => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList
         data={orders}  
         renderItem = {itemData => {console.log(itemData.item);
         return <OrderItem price={itemData.item.price} date={itemData.item.date} products={itemData.item.products}/>}}
        />
    )
};
export default OrderScreen;