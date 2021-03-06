import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { Platform, Button, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem
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
import EditProduct from '../screen/EditProductScreen';
import HomeScreen from '../screen/HomeScreen';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut, signIn, authenticate } from '../redux/actions/auth';

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
                </HeaderButtons>),
                headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="cart" iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => navigation.navigate("editProduct")}></Item>
                </HeaderButtons>)
            })} />
            <AdminStack.Screen name="editProduct" component={EditProduct} options={({ route }) => ({
                title: route.params && route.params.productId ? "Edit Product" : "Add Product"
            })} />
        </AdminStack.Navigator>
    )
}

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{ padding: 10 }} >
                <Button title="Sign out" onPress={() => dispatch(signOut())} color={COLORS.primary} />
            </View>
        </DrawerContentScrollView>
    );
}
const Drawer = createDrawerNavigator();
const ShopAuthenticatedNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: COLORS.primary
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
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
    )
};

const UnAuthStack = createStackNavigator();
const ShopUnAuthenticatedNavigator = () => {
    return (
        <UnAuthStack.Navigator screenOptions={NavigationOptions}>
            <UnAuthStack.Screen name="login" component={HomeScreen} />
        </UnAuthStack.Navigator>
    )
};

const ShopStack = createStackNavigator();
const ShopNavigator = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const [isSessionActive, setIsSessionActive] = useState(isLoggedIn);
    const dispatch = useDispatch();

    const checkUserSession = useCallback(async()=>{
        const userData = await AsyncStorage.getItem('userData');
        if(!userData){
            setIsSessionActive(false);
            dispatch(signOut());
            return;
        }
        const transformedUserData = JSON.parse(userData);
        const {userId, token, expiryDate} = transformedUserData;
        let expirationDate = new Date(expiryDate);
        if(!userId || !token || expirationDate <= new Date()){
            setIsSessionActive(false);
            dispatch(signOut());
            return;
        }
        let expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authenticate(userId, token, expirationTime))
    },[dispatch])
    useEffect(()=>{
        checkUserSession();
    },[checkUserSession])

    useEffect(()=>{
        setIsSessionActive(isLoggedIn);
    },[isLoggedIn])
    return (
        < NavigationContainer >
            {
                !isSessionActive ?
                    (
                        <ShopStack.Navigator screenOptions={NavigationOptions}>
                            <ShopStack.Screen name="unauthenticated" component={ShopUnAuthenticatedNavigator} options={{ title: "Shop" }} />
                        </ShopStack.Navigator>
                    ) : (
                        ShopAuthenticatedNavigator()
                    )
            }
        </NavigationContainer >
    )
}

export default ShopNavigator;