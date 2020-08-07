import React, { useCallback, useReducer } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ProductActions from "../redux/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";

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

  const submitHandler = useCallback(async() => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid input", "Please provide valid values", [
        { text: "ok" }
      ]);
      return;
    }
    try{
      if (productId) {
        await dispatch(
          ProductActions.updateProduct(productId, title, description, imageUrl)
        );
      } else {
        await dispatch(
          ProductActions.createProduct(title, description, imageUrl, +price)
        );
      }
      props.navigation.goBack();
    } catch (error){
      Alert.alert("oops", error.message, [
        { text: "ok" }
      ]);
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

  const inputHandler = useCallback(
    (id, inputValue, inputIsValid) => {
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
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            keyboardType="default"
            required
            onChangeText={inputHandler}
            errorText="Please enter Title"
            initialValue={product ? product.title : ""}
            initiallyValid={!!product}
          />
          <Input
            id="imageUrl"
            label="ImageUrl"
            keyboardType="default"
            required
            onChangeText={inputHandler}
            errorText="Please enter imageUrl"
            initialValue={product ? product.imageUrl : ""}
            initiallyValid={!!product}
          />
          {!product && (
            <Input
              id="price"
              label="Amount"
              keyboardType="decimal-pad"
              required
              onChangeText={inputHandler}
              errorText="Please enter valid amount"
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            keyboardType="default"
            required
            onChangeText={inputHandler}
            errorText="Please enter description"
            initialValue={product ? product.description : ""}
            initiallyValid={!!product}
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
