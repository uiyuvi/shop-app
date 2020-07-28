import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverView from '../screen/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator();
const ShopNavigator = () => {
    const NavigationOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? COLORS.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
    };
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={NavigationOptions}>
                <Stack.Screen name="Products" component={ProductsOverView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ShopNavigator;