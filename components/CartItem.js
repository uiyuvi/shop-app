import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemData}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.addItem} onPress={props.onRemoveSingleProduct}>
                        <Ionicons name={Platform.OS === "android" ? 'md-remove-circle' : 'ios-remove-circle'} size={23} color={"#888"}></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{props.quantity}</Text>
                    <TouchableOpacity style={styles.removeItem} onPress={props.onAdd}>
                        <Ionicons name={Platform.OS === "android" ? 'md-add-circle' : 'ios-add-circle'} size={23} color={"#888"}></Ionicons>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.price}>$ {props.price}</Text>
                <TouchableOpacity style={styles.removeItem} onPress={props.onRemove}>
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
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    },
    quantity: {
        fontFamily: 'open-sans-bold',
        color: '#888',
        fontSize: 18
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 16
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    addItem:{
        marginRight: 10
    },
    removeItem: {
        marginLeft: 10
    }
})