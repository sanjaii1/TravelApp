import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CabOneWay from './CabOneWay';


const Tab = createMaterialTopTabNavigator();

export default function CabHome() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { display: 'none' },
    }}
    >
      <Tab.Screen name="One Way" component={CabOneWay} />
    </Tab.Navigator>
  );
}
