import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HotelsHome() {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        label="Destination"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="outlined" onPress={() => setShowCheckIn(true)} style={styles.dateBtn}>
        Check-In: {checkInDate.toLocaleDateString()}
      </Button>
      {showCheckIn && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCheckIn(false);
            if (date) setCheckInDate(date);
          }}
        />
      )}

      <Button mode="outlined" onPress={() => setShowCheckOut(true)} style={styles.dateBtn}>
        Check-Out: {checkOutDate.toLocaleDateString()}
      </Button>
      {showCheckOut && (
        <DateTimePicker
          value={checkOutDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCheckOut(false);
            if (date) setCheckOutDate(date);
          }}
        />
      )}

      <Button mode="contained" onPress={() => {}} style={styles.searchBtn}>
        Search Hotels
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  dateBtn: {
    marginBottom: 20,
  },
  searchBtn: {
    marginTop: 30,
    borderRadius: 25,
  },
});
