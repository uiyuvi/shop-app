import React, { useState } from "react";
import { Animated, Easing, View, Text, StyleSheet, Platform } from "react-native";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "./CartItem";
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const getFormattedDate = rawDate => {
    let formattedDate =
        rawDate.getDate() + "/" + rawDate.getMonth() + "/" + rawDate.getFullYear();
    return formattedDate;
};
const OrderItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    const [showDetails, setShowDetails] = useState(false);
    const logoStyles = [];
    const animation = new Animated.Value(showDetails ? 0 : 1);

    Animated.timing(animation, {
        toValue: showDetails ? 1 : 0,
        duration: 200,
        useNativeDriver: true
    }).start();

    const rotateInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });
    const animatedStyles = { transform: [{ rotate: rotateInterpolate }], top : showDetails ? -2 : 5 };
    logoStyles.push(animatedStyles);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                <Text style={styles.date}>{getFormattedDate(props.date)}</Text>
            </View>
            <TouchableCmp 
                onPress={() => setShowDetails(prevState => !prevState)}>
                <View style={styles.detailsClickable}>
                    <Text style={styles.detailsText}>{showDetails ? "Hide details" : "Show details"}</Text>
                    <Animated.View style={logoStyles}>
                        <Ionicons
                            name={"ios-arrow-down"}
                            size={13}
                            color={COLORS.primary}
                        />
                    </Animated.View>
                </View>
            </TouchableCmp>
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
    },
    detailsClickable: {
        flexDirection: "row",
        justifyContent: "center"
    },
    detailsText: {
        paddingRight: 5,
        color: COLORS.primary
    }
});
