import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../components/CartItem';
import * as cartActions from '../redux/actions/cart'
import { addOrder } from '../redux/actions/orders';
import Card from '../components/Card';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { totalPrice, products } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const tranformedProducts = useSelector(state => {
        const tranformedProducts = [];
        for (const key in state.cart.products) {
            tranformedProducts.push({
                id: key,
                productTitle: state.cart.products[key].title,
                productPrice: state.cart.products[key].price,
                quantity: state.cart.products[key].quantity,
                sum: state.cart.products[key].sum
            })
        }
        return tranformedProducts.sort((a, b) => a.id > b.id ? 1 : -1);
    });
    const onOrderHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(addOrder(tranformedProducts, totalPrice))
        } catch (error) {
            Alert.alert("oops", error.message, [
                { text: "ok" }
            ]);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.price}>$ {totalPrice}</Text></Text>
                {isLoading ? <ActivityIndicator size="small" color={COLORS.primary} /> :
                    <Button color={COLORS.accent}
                        title="Order now"
                        disabled={tranformedProducts.length === 0}
                        onPress={onOrderHandler}
                    />
                }
            </Card>
            <FlatList data={tranformedProducts} renderItem={(itemData) => (
                <CartItem
                    modifiable={true}
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    price={itemData.item.productPrice}
                    onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.id, itemData.item.quantity))}
                    onRemoveSingleProduct={() => dispatch(cartActions.removeFromCart(itemData.item.id, 1))}
                    onAdd={() => {
                        let itemToAdd = {
                            id: itemData.item.id,
                            price: itemData.item.productPrice,
                            title: itemData.item.productTitle,
                            sum: itemData.item.sum
                        };
                        dispatch(cartActions.addToCart(itemToAdd));
                    }}
                />
            )} />
        </View>
    )
}
export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 20
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    price: {
        color: COLORS.primary
    }
})