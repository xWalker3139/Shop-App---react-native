import React from 'react-native';
import { View, Button } from 'react-native';

const ButtonUp = (props) => {
    return (
        <View>
            <Button onPress={props.onCartDetail} color={props.color} title={props.title} />
        </View>
    )
}

export default ButtonUp;