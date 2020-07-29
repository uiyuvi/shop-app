import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverView from '../screen/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';
import ProductDetails from '../screen/ProductDetailsScreen';

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
                <Stack.Screen name="ProductDetails" component={ProductDetails} options={({ route }) => ({ title: route.params.title })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ShopNavigator;