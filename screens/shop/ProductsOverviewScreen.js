import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Platform, Button, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import ButtonUp from '../../components/UI/ButtonUp';

const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsActions.fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                await dispatch(productsActions.fetchProducts());
            }catch(err) {
                setError(err.message);
            }
            setIsLoading(false);
            loadProducts();
        }
    }, [dispatch]);

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color='red' />
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }

    if(error){
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="Try again" onPress={() => {}} />
            </View>
        )
    }

    return (
        <View style={styles.flat}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('EditProduct')}} style={styles.editButton}>
                <Text>Go to edit screen!</Text>
            </TouchableOpacity>
            <FlatList data={products}
                    keyExtractor={item => item.id}
                    renderItem={itemData => <ProductItem title={itemData.item.title}
                                                        price={itemData.item.price}
                                                        image={itemData.item.imageUrl} 
                                                        onViewDetail={() => props.navigation.navigate('ProductDetail', { productId: itemData.item.id, productTitle: itemData.item.title})}
                                                        onAddTocart={() => {dispatch(cartActions.addToCart(itemData.item))}}
                                            />} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flat: {
        alignItems: 'center',
        marginVertical: 18,
    },
    editButton: {
        marginVertical: 30,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: (
            <ButtonUp
                onCartDetail={() => {navData.navigation.navigate('CartDetail')}}
                color='red'
                title='Cart'
            />
        )
    }
}

export default ProductsOverviewScreen;