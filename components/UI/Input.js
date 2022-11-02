import React, { useReducer } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch(action.type){
        case INPUT_CHANGE:
            default:
                return state;
    }
}

const Input = (props) => {
    const [ inputState, dispatch ] = useReducer(inputReducer, {
        value: props.initialValue,
        isValid: props.initialValid,
        touched: false,
    });
    const textChangeHandler = text => {
        dispatch({ type: INPUT_CHANGE, value: text});
    }
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                onChangeText={textChangeHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default Input;