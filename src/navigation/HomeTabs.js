import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlightHome from '../screens/Flights/FlightHome';
import CabHome from '../screens/Cabs/CabHome';
import HotelHome from '../screens/Hotels/HotelHome';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Flights"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Flights') iconName = 'airplane';
          else if (route.name === 'Cabs') iconName = 'car';
          else if (route.name === 'Hotels') iconName = 'bed';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Flights" component={FlightHome} />
      <Tab.Screen name="Cabs" component={CabHome} />
      <Tab.Screen name="Hotels" component={HotelHome} />
    </Tab.Navigator>
  );
}
