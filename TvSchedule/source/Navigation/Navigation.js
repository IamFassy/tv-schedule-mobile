import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Details from '../Screens/Details/Details';
import Colors from '../Utils/Colors';
import Search from '../Screens/Search/Search';
import { TextInput, View } from 'react-native';

const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={Home} />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Details"
                    component={Details} />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Search"
                    component={Search} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;