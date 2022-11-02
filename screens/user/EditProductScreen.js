import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

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

const EditProductScreen = (props) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageIsValid, setImageIsValid] = useState(false);
    const [priceIsValid, setPriceIsValid] = useState(false);
    const [descriptionIsValid, setDescriptionIsValid] = useState(false);
    
    const prodId = props.navigation.getParam('productId')
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: '',
            image: '',
            price: '',
            description: '',
        },
        inputValidates: {
            title: false,
            image: false,
            price: false,
            description: false,
        },
        formIsValid: false
    })

    // const titleChangeHandler = (text) => {
    //     let isValid = false;
    //     if(text.trim().length === 0){
    //         isValid = true
    //     }
    //     dispatchFormState({
    //         type: FORM_INPUT_UPDATE,
    //         value: text,
    //         isValid: isValid,
    //         input: '',
    //     })
    // }

    const submitHandler = useCallback(() => {
        dispatch(productsActions.createProduct(title, description, price))
    }, [dispatch, prodId])

    useEffect(() => {
        props.navigation.setParams({'submit':submitHandler});
    }, [submitHandler]);

    const titleValid = (text) => {
        if(text.trim().length === 0){
            setTitleIsValid(false);
        }else{
            setTitleIsValid(true);
        }
        setTitle(text);
    }

    const imageValid = (text) => {
        if(text.trim().length === 0){
            setImageIsValid(false);
        }else{
            setImageIsValid(true);
        }
        setImage(text);
    }

    const priceValid = (text) => {
        if(text.trim().length === 0){
            setPriceIsValid(false);
        }else{
            setPriceIsValid(true);
        }
        setPrice(text);
    }

    const descriptionValid = (text) => {
        if(text.trim().length === 0){
            setDescriptionIsValid(false);
        }else{
            setDescriptionIsValid(true);
        }
        setDescription(text);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={titleValid}
                        keyboardType="default"
                        autoCorrect
                        autoCapitalize="sentences"
                        required
                    />
                    {!titleIsValid && <View><Text style={ styles.errorText }>Please enter valid title!</Text></View>}
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Image"
                        value={image}
                        onChangeText={imageValid}
                    />
                    {!imageIsValid && <View><Text style={styles.errorText}>Please enter valid image!</Text></View>}
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        value={price}
                        onChangeText={priceValid}
                        keyboardType="decimal-pad"
                    />
                    {!priceIsValid && <View><Text style={styles.errorText}>Please enter valid price!</Text></View>}
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={descriptionValid}
                        multiline
                    />
                    {!descriptionIsValid && <View><Text style={ styles.errorText }>Please enter valid description!</Text></View>}
                </View>
            </View>
            <TouchableOpacity onPress={() => {props.navigation.getParam('submit')}} style={styles.submitButton}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    submitButton: {
        marginHorizontal: 40,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#00B4D8',
    },
    errorText: {
        color: 'red',
    }
})

export default EditProductScreen;