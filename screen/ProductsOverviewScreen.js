import React from 'react';
import { FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import * as cartActions from '../redux/actions/cart';

const ProductsOverView = (props) => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList data={availableProducts} renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { props.navigation.navigate("ProductDetails", { title: itemData.item.title, productId: itemData.item.id }) }}
                addToCart={() => dispatch(cartActions.addToCart(itemData.item))}
            />
        )}
        />
    )
};

export default ProductsOverView;