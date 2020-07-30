import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverView from '../screen/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';
import ProductDetails from '../screen/ProductDetailsScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import CartScreen from '../screen/CartScreen';

const Stack = createStackNavigator();
const ShopNavigator = () => {
    const NavigationOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? COLORS.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
    };
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={NavigationOptions}>
                <Stack.Screen name="Products" component={ProductsOverView} options={({ navigation }) => ({
                    headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title="cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                            navigation.navigate("Cart")
                        }}></Item>
                    </HeaderButtons>)
                })} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} options={({ route }) => ({ title: route.params.title })} />
                <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ShopNavigator;