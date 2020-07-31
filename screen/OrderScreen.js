import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

const OrderScreen = () => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <View>
            <Text>{orders.price}</Text>
        </View>
    )
};
export default OrderScreen;