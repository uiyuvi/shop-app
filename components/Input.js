import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  if (action.type === INPUT_CHANGE) {
    return {
      ...state,
      value: action.inputValue,
      isValid: action.isValid
    };
  }
  if (action.type === INPUT_BLUR) {
    return {
      ...state,
      touched: true
    };
  }
  return state;
};
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false
  });
  const inputHandler = (inputType, inputValue) => {
    let isValid = true;
    if (props.required && inputValue.trim().length === 0) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      inputValue,
      isValid: isValid
    });
  };
  const onBlurHandler = () => {
    dispatch({
      type: INPUT_BLUR
    });
  };
  useEffect(() => {
    props.onChangeText(props.id, inputState.value, inputState.isValid);
  }, [props.id, inputState.value, inputState.isValid]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={text => inputHandler(props.id, text)}
        onBlur={onBlurHandler}
      />
      {inputState.touched && !inputState.isValid && (
        <Text>{props.errorText}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
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
