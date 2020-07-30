import React from 'react';
import { View, Text, Button, StyleSheet, Image, Platform } from "react-native";
import { COLORS } from '../constants/colors';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <View style={styles.product}>
            <TouchableCmp useForeground onPress={props.onSelect}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.image }} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actionContianer}>
                        <Button color={COLORS.primary} title="View details" onPress={props.onSelect}/>
                        <Button color={COLORS.primary} title="Add to cart" />
                    </View>
                </View>
            </TouchableCmp>
        </View>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 7,
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        height: '60%',
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    details: {
        height: '15%',
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actionContianer: {
        height: '25%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }
})