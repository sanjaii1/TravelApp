import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const OneWayForm = () => {
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
      <Text style={styles.label}>From & To</Text>
      <View style={styles.row}>
        <TextInput mode="outlined" label="From" style={styles.input} />
        <IconButton icon="swap-horizontal" size={24} />
        <TextInput mode="outlined" label="To" style={styles.input} />
      </View>

      <Text style={styles.label}>Departure</Text>
      <Button 
        mode="outlined" 
        onPress={showDatePickerModal}
        style={styles.dateButton}
      >
        {departureDate.toLocaleDateString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <TextInput mode="outlined" label="Class (e.g. Economy)" style={styles.inputFull} />

      <Text style={styles.label}>Travelers</Text>
      <TextInput mode="outlined" label="Adults" keyboardType="number-pad" style={styles.inputFull} />
      <TextInput mode="outlined" label="Children" keyboardType="number-pad" style={styles.inputFull} />
      <TextInput mode="outlined" label="Infants (<2yrs)" keyboardType="number-pad" style={styles.inputFull} />

      <Button mode="contained" style={{ marginTop: 20 }}>Search Flights</Button>
    </View>
  );
};

export default OneWayForm;

const styles = StyleSheet.create({
  label: { marginTop: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1 },
  inputFull: { width: '100%', marginTop: 10 },
  dateButton: { width: '100%', marginTop: 10, marginBottom: 16 },
});
