import React, { useCallback, useReducer } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ProductActions from "../redux/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let updatedInputValues = {
      ...state.inputValues,
      [action.inputData.inputType]: action.inputData.inputValue
    };

    let updatedInputValidities = {
      ...state.inputValidities,
      [action.inputData.inputType]: action.inputData.inputIsValid
    };

    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }

    return {
      ...state,
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

const EditProduct = props => {
  const { route } = props;
  const { params } = route;
  const { productId } = params || "";

  const product = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId)
  );
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: product ? product.price : "",
      description: product ? product.description : ""
    },
    inputValidities: {
      title: product ? true : "",
      imageUrl: product ? true : "",
      price: product ? true : "",
      description: product ? true : ""
    },
    formIsValid: product ? true : false
  });
  const { title, imageUrl, price, description } = formState.inputValues;

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid input", "Please provide valid values", [
        { text: "ok" }
      ]);
      return;
    }
    if (productId) {
      dispatch(
        ProductActions.updateProduct(productId, title, description, imageUrl)
      );
    } else {
      dispatch(
        ProductActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
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

  const inputHandler = useCallback(
    (id, inputValue) => {
      let inputIsValid = true;
      if (inputValue.trim().length === 0) {
        inputIsValid = false;
      }

      formDispatch({
        type: FORM_INPUT_UPDATE,
        inputData: {
          inputType: id,
          inputValue,
          inputIsValid
        }
      });
    },
    [formDispatch]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => inputHandler("title", text)}
          />
          {!formState.inputValidities.title && <Text>Please enter Title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => inputHandler("imageUrl", text)}
          />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => inputHandler("price", text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => inputHandler("description", text)}
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
