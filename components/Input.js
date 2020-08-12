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
    touched: props.initialValue.trim().length > 0
  });
  const inputHandler = inputValue => {
    let isValid = true;
    if (props.required && inputValue.trim().length === 0) {
      isValid = false;
    }
    if (props.min !== null && +inputValue < props.min) {
      isValid = false;
    }
    if (
      props.minLength !== null &&
      inputValue.trim().length < props.minLength
    ) {
      isValid = false;
    }
    if (
      props.email &&
      !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue.trim()))
    ) {
      isValid = false
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
    if (inputState.touched) {
      props.onChangeText(props.id, inputState.value, inputState.isValid);
    }
  }, [props.id, props.onChangeText, inputState]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={text => inputHandler(text)}
        onEndEditing={onBlurHandler}
        onBlur={onBlurHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
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
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: "red",
    fontFamily: "open-sans",
    fontSize: 14
  }
});
