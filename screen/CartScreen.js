import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../components/CartItem';
import * as cartActions from '../redux/actions/cart'

const CartScreen = () => {
    const { totalPrice } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const items = useSelector(state => {
        const tranformedItems = [];
        for (const key in state.cart.items) {
            tranformedItems.push({
                id: key,
                productTitle: state.cart.items[key].title,
                productPrice: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return tranformedItems;
    })
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.price}>${totalPrice}</Text></Text>
                <Button color={COLORS.accent} title="Order now" disabled={items.length === 0} />
            </View>
            <FlatList data={items} renderItem={(itemData) => (
                <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    price={itemData.item.productPrice}
                    onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.id))}
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
        padding: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 7
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    price: {
        color: COLORS.primary
    }
})