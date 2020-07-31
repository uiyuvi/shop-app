import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.price}>{props.price}</Text>
                <TouchableOpacity style={styles.removeItem}>
                    <Ionicons name={Platform.OS === "android" ? 'md-trash' : 'ios-trash'} size={23} color={"red"}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CartItem;
const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: 'white'
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center"
    },
    quantity: {
        fontFamily: 'open-sans-bold',
        color: '#888',
        fontSize: 18,
        marginRight:5
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 16
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    removeItem: {
        marginLeft: 20
    }
})