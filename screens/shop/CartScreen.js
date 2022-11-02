import React from 'react';
import { Text, View, StyleSheet, FlatList, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../models/cart-item';

import * as cartAction from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/orders';

const CartScreen = (props) => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItem = [];
        for(const key in state.cart.items){
            transformedCartItem.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItem;
    })

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{''}
                    <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                    <Button color='yellow' title="Order now" onPress={() => {dispatch(ordersAction.addOrder(cartItems, cartTotalAmount))}} />
                </Text>
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (<CartItem quantity={itemData.item.quantity} title={itemData.item.title} amount={itemData.item.amount} onRemove={() => {dispatch(cartAction.removeFromCart(itemData.item.productId))}} />)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
    },
    color: {
        color: 'red',
    }
})

export default CartScreen;