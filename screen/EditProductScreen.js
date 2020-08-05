import React, { useState, useCallback } from "react";
import { Platform, View, Text, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ProductActions from "../redux/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";

const EditProduct = props => {
  const { route } = props;
  const { params } = route;
  const { productId } = params || "";

  const product = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId)
  );
  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (productId) {        
      dispatch(
        ProductActions.updateProduct(productId, title, description, imageUrl)
      );
    } else {
      dispatch(
        ProductActions.createProduct(title, description, imageUrl, +price)
      );
    }
  }, [dispatch, productId, title, description, imageUrl, price]);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="cart"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {
              submitHandler();
            }}
          ></Item>
        </HeaderButtons>
      )
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  }
});
