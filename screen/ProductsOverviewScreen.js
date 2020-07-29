import React from 'react';
import { Text, FlatList } from "react-native";
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';

const ProductsOverView = () => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts} renderItem={itemData => <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}/>} />
    )
};

export default ProductsOverView;