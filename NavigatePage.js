import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import Registration from './Registration';
import MainMenu from './MainMenu';
import ProductInfo from './ProductInfo';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import CategoryInfo from './CategoryInfo';
import CategorySearch from './CategorySearch';
import OrderPage from './OrderPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs(true);

const MainTabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Main Menu"
        screenOptions={{
            activeTintColor: '#3498db',
            inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen
            name="Main Menu"
            component={MainMenu}
            options={{
                tabBarLabel: 'Main Menu',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Categories"
            component={CategoryPage}
            options={{
                tabBarLabel: 'Categories',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="albums-outline" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Orders"
            component={OrderPage}
            options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="cart-outline" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

const NavigatePage = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Registration">
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main Tabs" component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Product Information" component={ProductInfo} />
                <Stack.Screen name="Search Product" component={SearchPage} />
                <Stack.Screen name="Category Information" component={CategoryInfo} />
                <Stack.Screen name="Searched Product" component={CategorySearch} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigatePage;
