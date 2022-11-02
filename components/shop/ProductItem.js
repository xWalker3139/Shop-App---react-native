import React from 'react';
import { Text, View, StyleSheet, Button, Image} from 'react-native';

const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View>
                <Button
                    color='red'
                    title="View Detail"
                    onPress={props.onViewDetail}
                />
                <Button
                    color='red'
                    title="To Cart"
                    onPress={props.onAddToCart}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        width: 200,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10,
        marginBottom: 26,
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default ProductItem;