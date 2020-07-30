import React from 'react';
import { useSelector } from 'react-redux';
import { Image, Button, StyleSheet, ScrollView, View, Text } from 'react-native';
import { COLORS } from '../constants/colors';
const ProductDetails = (props) => {
    const SelctedProductId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === SelctedProductId));

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={COLORS.primary} title="Add to product" />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

export default ProductDetails;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        color: '#888',
        marginVertical: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: "center"
    }
})