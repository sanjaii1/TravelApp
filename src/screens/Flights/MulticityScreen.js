import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const MultiCityScreen = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Text style={styles.label}>Segment 1</Text>
      <TextInput mode="outlined" label="From" style={styles.input} />
      <TextInput mode="outlined" label="To" style={styles.input} />
      <Button 
        mode="outlined" 
        onPress={showDatePickerModal}
        style={styles.dateButton}
      >
        Departure: {departureDate.toLocaleDateString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {/* Repeat similar block for more segments */}
      <Button mode="outlined" style={{ marginTop: 16 }}>Add Another Segment</Button>

      <Button mode="contained" style={{ marginTop: 20 }}>Search Multi-City</Button>
    </View>
  );
};

export default MultiCityScreen;

const styles = StyleSheet.create({
  label: { marginTop: 16, fontWeight: 'bold' },
  input: { marginTop: 8 },
  dateButton: { width: '100%', marginTop: 10 },
});
