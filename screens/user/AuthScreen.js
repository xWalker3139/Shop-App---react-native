import React, { useReducer, useCallback } from 'react';
import { View, Button, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidates,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidates: updatedValidities,
            inputValues: updatedValues,
        }
    }
    return state;
};

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [ formState, dispatchFormState ] = useReducer(formReducer, {
        inputValue: {
            email: '',
            password: '',
        },
        inputValidities : {
            email: false,
            password: false,
        },
        formIsValid: false
    })

    const signupHandler = () => {
        dispatch(
            authActions.signup(
                formState.inputValue.email,
                formState.inputValue.password,
            )
        )
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            })
        },
        [dispatchFormState]
    )

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', 'ffeff']} style={styles.gradient}>
                <View style={styles.autoContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please entera valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter valid password"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Login" color="red" onPress={signupHandler} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Switch to sign up" color="blue" onPress={() => {}} />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    autoContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default AuthScreen;