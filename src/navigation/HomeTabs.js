import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlightHome from '../screens/Flights/FlightHome';
import CabHome from '../screens/Cabs/CabHome';
import HotelHome from '../screens/Hotels/HotelHome';
import { Ionicons, Feather } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  const renderHeader = () => ({
    title: 'FairYaatra',
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    headerRight: () => (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="person-circle-outline" size={26} color="#007AFF" />
        </TouchableOpacity>
      </React.Fragment>
    ),
  });

  return (
    <Tab.Navigator
      initialRouteName="Flights"
      screenOptions={({ route }) => ({
        ...renderHeader(),
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
      <Tab.Screen name="Flights" component={FlightHome} />
      <Tab.Screen name="Cabs" component={CabHome} />
      <Tab.Screen name="Hotels" component={HotelHome} />
    </Tab.Navigator>
  );
}
