// ... existing code ...
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MulticityScreen from './MulticityScreen.js';

const TABS = [
  { label: 'One Way', icon: 'airplane' },
  { label: 'Round Trip', icon: 'airplane-takeoff' },
  { label: 'Multicity', icon: 'map-marker-path' },
];

const FlightHome = () => {
  const [activeTab, setActiveTab] = useState('One Way');

  const renderForm = () => {
    switch (activeTab) {
      case 'One Way':
        return <OneWayForm />;
      case 'Round Trip':
        return <RoundTripForm />;
      case 'Multicity':
        return <MulticityScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.gradientBg}>
      <Text style={styles.header}>Book Your Flight</Text>
      <Surface style={styles.tabBar} elevation={4}>
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <Button
              key={tab.label}
              mode={activeTab === tab.label ? 'contained' : 'text'}
              icon={() => (
                <Icon
                  name={tab.icon}
                  size={22}
                  color={activeTab === tab.label ? '#fff' : '#6200ee'}
                />
              )}
              style={[
                styles.tabButton,
                activeTab === tab.label && styles.activeTabButton,
              ]}
              labelStyle={{
                color: activeTab === tab.label ? '#fff' : '#6200ee',
                fontWeight: 'bold',
              }}
              onPress={() => setActiveTab(tab.label)}
              uppercase={false}
            >
              {tab.label}
            </Button>
          ))}
        </View>
      </Surface>
      <View style={styles.formContainer}>
        {renderForm()}
      </View>
    </View>
  );
};

export default FlightHome;

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
    alignSelf: 'center',
    color: '#22223b',
    letterSpacing: 1,
  },
  tabBar: {
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    borderRadius: 0,
    marginHorizontal: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  activeTabButton: {
    backgroundColor: '#6200ee',
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});