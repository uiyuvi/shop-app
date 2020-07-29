import React from 'react';
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { COLORS } from '../constants/colors';

const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.image }} style={styles.image} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionContianer}>
                <Button color={COLORS.primary} style={styles.action} title="View details" />
                <Button color={COLORS.primary} title="Add to cart" />
            </View>
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
        margin: 20
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
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actionContianer: {
        height: '25%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    action: {
        elevation: 0
    }
})