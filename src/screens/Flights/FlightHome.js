import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MulticityScreen from './MulticityScreen.js';

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
      <View style={styles.tabRow}>
        {['One Way', 'Round Trip', 'Multicity'].map((tab) => (
          <Button
            key={tab}
            mode={activeTab === tab ? 'contained' : 'outlined'}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </View>

      {renderForm()}
    </View>
  );
};

export default FlightHome;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
