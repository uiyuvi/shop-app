import React, { useState, useReducer, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Button, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import { COLORS } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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
const HomeScreen = () => {
    const [isSignupState, setIsSignupState] = useState(false);
    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            username: "",
            password: ""
        },
        inputValidities: {
            username: true,
            password: true
        },
        formIsValid: false
    });
    const { username, password } = formState.inputValues;
    const dispatch = useDispatch();
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
    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert("Invalid input", "Please provide valid values", [
                { text: "ok" }
            ]);
            return;
        }
        try {
            if (isSignupState) {
                console.log(username, password);
            } else {
                console.log(username, password);
            }
        } catch (error) {
            Alert.alert("oops", error.message, [
                { text: "ok" }
            ]);
        }
    }, [dispatch, username, password, isSignupState]);
    return (
        <View style={styles.screen}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <View>
                        <Input
                            id="username"
                            label="Username"
                            keyboardType="default"
                            email
                            required
                            onChangeText={inputHandler}
                            errorText="Please enter valid username"
                            initialValue={""}
                            initiallyValid={false}
                        />
                        <Input
                            id="password"
                            label="Password"
                            secureTextEntry
                            keyboardType="default"
                            required
                            onChangeText={inputHandler}
                            errorText="Please enter valid password"
                            initialValue={""}
                            initiallyValid={false}
                        />
                        <View style={styles.actionContianer}>
                            <Button title={isSignupState ? "sign up" : "sign in"} color={COLORS.primary} onPress={submitHandler} />
                        </View>
                        <View style={styles.actionContianer}>
                            <Button title={`Switch to ${isSignupState ? "sign in" : "sign up"}`} color={COLORS.accent} onPress={() => setIsSignupState(prevState => !prevState)} />
                        </View>
                    </View>
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
        </View>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: '100%'
    },
    authContainer: {
        width: '80%',
        minWidth: 350,
        padding: 20,
        maxHeight: 400,
    },
    actionContianer: {
        marginTop: 10
    }
});