import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import ProductsOverView from '../screen/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';
import ProductDetails from '../screen/ProductDetailsScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import CartScreen from '../screen/CartScreen';
import OrderScreen from '../screen/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProducts from '../screen/UserProductsScreen';

const ProductsStack = createStackNavigator();
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
const ProductsNavigator = () => {
    return (
        <ProductsStack.Navigator screenOptions={NavigationOptions}>
            <ProductsStack.Screen name="Products" component={ProductsOverView} options={({ navigation }) => ({
                headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                        navigation.navigate("Cart")
                    }}></Item>
                </HeaderButtons>),
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="cart" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navigation.toggleDrawer()}></Item>
                </HeaderButtons>)
            })} />
            <ProductsStack.Screen name="ProductDetails" component={ProductDetails} options={({ route }) => ({ title: route.params.title })} />
            <ProductsStack.Screen name="Cart" component={CartScreen} />
        </ProductsStack.Navigator>
    );
};



const OrdersStack = createStackNavigator();
const OrdersNavigator = () => {
    return (
        <OrdersStack.Navigator screenOptions={NavigationOptions} >
            <OrdersStack.Screen name="orders" component={OrderScreen} options={({ navigation }) => ({
                title: "Your orders",
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="cart" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navigation.toggleDrawer()}></Item>
                </HeaderButtons>)
            })} />
        </OrdersStack.Navigator>
    )
}

const AdminStack = createStackNavigator();
const AdminNavigator = () => {
    return (
        <AdminStack.Navigator screenOptions={NavigationOptions} >
            <AdminStack.Screen name="orders" component={UserProducts} options={({ navigation }) => ({
                title: "Your Products",
                headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="cart" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navigation.toggleDrawer()}></Item>
                </HeaderButtons>)
            })} />
        </AdminStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const ShopDrawer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: COLORS.primary
                }}>
                <Drawer.Screen name="products" component={ProductsNavigator} options={{
                    drawerLabel: 'Products',
                    drawerIcon: ({ focused }) => (
                        <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={focused ? COLORS.primary : 'black'} />
                    )
                }}
                />
                <Drawer.Screen name="orders" component={OrdersNavigator} options={{
                    title: 'Orders',
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={focused ? COLORS.primary : 'black'} />
                    )
                }} />
                <Drawer.Screen name="admin" component={AdminNavigator} options={{
                    title: 'Admin',
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            size={23}
                            color={focused ? COLORS.primary : 'black'} />
                    )
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default ShopDrawer;