import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButtons
            {...props}
            IconComponent={Ionicons}
            color={Platform.OS === 'android' ? 'white' : 'red' }
            iconSize={23}
        />
    )
}

export default CustomHeaderButton;