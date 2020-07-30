import React from 'react';
import { FlatList } from "react-native";
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';

const ProductsOverView = (props) => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts} renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { props.navigation.navigate("ProductDetails", { title: itemData.item.title, productId: itemData.item.id }) }}
            />
        )}
        />
    )
};

export default ProductsOverView;