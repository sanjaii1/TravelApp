import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlightHome from '../screens/Flights/FlightHome';
import CabHome from '../screens/Cabs/CabHome';
import HotelHome from '../screens/Hotels/HotelHome';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  const titleMap = { Flights: 'Flight', Cabs: 'Cab', Hotels: 'Hotel' };

  return (
    <Tab.Navigator
      initialRouteName="Flights"
      screenOptions={({ route }) => ({
        headerTitle: titleMap[route.name] || route.name,
        headerTitleAlign: 'left',
        headerTitleStyle: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
            <Ionicons name="person-circle-outline" size={26} color="#007AFF" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Flights') iconName = 'airplane';
          else if (route.name === 'Cabs') iconName = 'car';
          else if (route.name === 'Hotels') iconName = 'bed';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Flights" component={FlightHome} options={{ tabBarLabel: 'Flight' }} />
      <Tab.Screen name="Cabs" component={CabHome} options={{ tabBarLabel: 'Cab' }} />
      <Tab.Screen name="Hotels" component={HotelHome} options={{ tabBarLabel: 'Hotel' }} />
    </Tab.Navigator>
  );
}
