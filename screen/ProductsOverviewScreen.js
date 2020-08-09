import React, { useEffect, useCallback, useState } from "react";
import { Button, FlatList, ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../redux/actions/cart";
import { COLORS } from "../constants/colors";
import { getProduct } from "../redux/actions/products";

const ProductsOverView = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const availableProducts = useSelector(
    state => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getProduct());
    } catch (error) {
      setError(error.message)
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setIsLoading(true);
      loadProducts().then(()=>{
        setIsLoading(false);
      });
    });
    return unsubscribe;
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(()=>{
      setIsLoading(false);
    });
  }, [loadProducts]);
  const onSelectHandler = (title, id) => {
    props.navigation.navigate("ProductDetails", {
      title: title,
      productId: id
    });
  };
  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />
  }
  if (error) {
    return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>
  }
  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadProducts}
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    fontFamily: "open-sans",
    fontSize: 16
  }
})
