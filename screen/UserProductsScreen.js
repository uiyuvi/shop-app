import React from "react";
import { Button, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../redux/actions/cart";
import { COLORS } from "../constants/colors";
import { deleteProduct } from "../redux/actions/products";

const UserProducts = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const onSelectHandler = id => {
    props.navigation.navigate("editProduct", { productId: id });
  };

  const deleteHandler = id => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this product?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch(deleteProduct(id))
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
          addToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        >
          <Button
            color={COLORS.primary}
            title="Edit"
            onPress={() => onSelectHandler(itemData.item.id)}
          />
          <Button
            color={COLORS.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProducts;
