import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "./CartItem";

const getFormattedDate = rawDate => {
    let formattedDate =
        rawDate.getDate() + "/" + rawDate.getMonth() + "/" + rawDate.getFullYear();
    return formattedDate;
};
const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                <Text style={styles.date}>{getFormattedDate(props.date)}</Text>
            </View>
            <Ionicons
                name={showDetails ? "ios-arrow-dropup" : "ios-arrow-dropdown"}
                size={23}
                color={COLORS.primary}
                onPress={() => setShowDetails(prevState => !prevState)}
            />
            {
                showDetails &&
                <View style={styles.orderDetails}>
                    {
                        props.products.map(
                            product => <CartItem key={product.id} quantity={product.quantity} price={product.productPrice} title={product.productTitle} modifiable={false} />
                        )
                    }
                </View>
            }
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 7,
        alignItems: "center",
        margin: 20,
        padding: 10
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    price: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    date: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "#888"
    },
    orderDetails: {
        width: "100%"
    }
});
