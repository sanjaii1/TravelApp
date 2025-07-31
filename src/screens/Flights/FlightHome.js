import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Book Your Flight</Text>
        <Text style={styles.headerSubtitle}>Choose your travel type</Text>
      </LinearGradient>
      
      <View style={styles.contentContainer}>
        <View style={styles.tabBar}>
          <View style={styles.tabRow}>
            {TABS.map((tab) => (
              <Button
                key={tab.label}
                mode={activeTab === tab.label ? 'contained' : 'text'}
                icon={() => (
                  <Icon
                    name={tab.icon}
                    size={20}
                    color={activeTab === tab.label ? '#FFFFFF' : '#4F46E5'}
                  />
                )}
                style={[
                  styles.tabButton,
                  activeTab === tab.label && styles.activeTabButton,
                ]}
                labelStyle={[
                  styles.tabLabel,
                  activeTab === tab.label && styles.activeTabLabel
                ]}
                onPress={() => setActiveTab(tab.label)}
                uppercase={false}
              >
                {tab.label}
              </Button>
            ))}
          </View>
        </View>
        
        <View style={styles.formContainer}>
          {renderForm()}
        </View>
      </View>
    </View>
  );
};

export default FlightHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    opacity: 0.9,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F8FAFC',
  },
  tabBar: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    borderRadius: 0,
    marginHorizontal: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    paddingVertical: 12,
  },
  activeTabButton: {
    backgroundColor: '#4F46E5',
  },
  tabLabel: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
  },
});