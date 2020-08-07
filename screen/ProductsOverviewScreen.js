import React, { useEffect, useCallback } from "react";
import { Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../redux/actions/cart";
import { COLORS } from "../constants/colors";
import { getProduct } from "../redux/actions/products";

const ProductsOverView = props => {
  const availableProducts = useSelector(
    state => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const loadProducts = useCallback(() => {
    dispatch(getProduct());
  }, [dispatch]);
  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProducts();
    });
    return unsubscribe;
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const onSelectHandler = (title, id) => {
    props.navigation.navigate("ProductDetails", {
      title: title,
      productId: id
    });
  };
  return (
    <FlatList
      data={availableProducts}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            onSelectHandler(itemData.item.title, itemData.item.id)
          }
        >
          <Button
            color={COLORS.primary}
            title="View details"
            onPress={() =>
              onSelectHandler(itemData.item.title, itemData.item.id)
            }
          />
          <Button
            color={COLORS.primary}
            title="Add to cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverView;
