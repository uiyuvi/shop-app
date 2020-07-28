import React from 'react';
import { Text, FlatList } from "react-native";
import { useSelector } from 'react-redux';

const ProductsOverView = () => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
    )
};

export default ProductsOverView;