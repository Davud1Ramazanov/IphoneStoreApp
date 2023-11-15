import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainMenu from './MainMenu';

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="MainMenu"
                tabBarOptions={{
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
                {/* <Tab.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
                        tabBarLabel: 'Categories',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="grid-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                    }}
                /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomNavBar;