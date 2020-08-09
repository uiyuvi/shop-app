import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import OrderItem from "../components/OrderItem";
import { getOrders } from "../redux/actions/orders";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

const OrderScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const fetchOrder = useCallback(async () => {
        setIsLoading(true);
        await dispatch(getOrders());
        setIsLoading(false);
    }, [dispatch]);
    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setIsLoading(true);
            fetchOrder().then(() => {
                setIsLoading(false);
            });
        });
        return unsubscribe;
    }, [fetchOrder]);

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>
    }
    return (
        <FlatList
            data={orders}
            renderItem={itemData => <OrderItem price={itemData.item.price} date={itemData.item.date} products={itemData.item.products} />}
        />
    )
};
export default OrderScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
})