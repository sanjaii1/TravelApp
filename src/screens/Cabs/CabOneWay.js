import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CabOneWay() {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput label="Pickup Location" mode="outlined" style={styles.input} />
      <TextInput label="Drop Location" mode="outlined" style={styles.input} />
      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        Pickup Date: {pickupDate.toLocaleDateString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, date) => {
            setShowDatePicker(false);
            if (date) setPickupDate(date);
          }}
        />
      )}

      <Button mode="contained" style={{ marginTop: 20 }}>Search Cabs</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 10 },
  dateButton: { marginBottom: 10 },
});
