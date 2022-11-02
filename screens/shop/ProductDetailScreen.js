import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <Button color="red" title="Add to cart" onPress={() => {dispatch(cartActions.addToCart(selectedProduct))}}/>
            <Text style={styles.price}>${ selectedProduct.price }</Text>
            <Text style={styles.description}>{ selectedProduct.description }</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        color: '#888',
        textAlign: 'center',
        fontSize: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

export default ProductDetailScreen;