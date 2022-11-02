import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                (itemData) => {
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                    >
                        <Button color='red' title="Edit" onPress={} />
                        <Button color='red' title="Delete" onPress={() => {dispatch(productsActions.deleteProduct(itemData.item.id))}} />
                    </ProductItem>
                }
            }
        />
    )
}

export default UserProductsScreen;