import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Orders from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'red' : 'white'
    },
    headerTintColor: {
        backgroundColor: Platform.OS === 'android' ? 'white' : 'red'
    }
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        CartDetail: CartScreen,
        ProductDetail: ProductDetailScreen,
        EditProduct: EditProductScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
)

const OrdersNavigator = createStackNavigator(
    {
        Order: Orders,
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
)

const AuthScreenNav = createStackNavigator({
    AuthScreenNav: AuthScreen,
})

const MainNavigator = createSwitchNavigator({
    AuthScreenNav: AuthScreenNav,
    Products: ProductsNavigator,
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Order: OrdersNavigator,
})

export default createAppContainer(MainNavigator);