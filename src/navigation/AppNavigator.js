import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import FlightHome from '../screens/Flights/FlightHome';
import CabHome from '../screens/Cabs/CabHome';
import HotelHome from '../screens/Hotels/HotelHome';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Flights" component={FlightHome} />
        <Stack.Screen name="Cabs" component={CabHome} />
        <Stack.Screen name="Hotels" component={HotelHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
