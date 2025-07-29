import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RoundTripForm = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const onDepartureDateChange = (event, selectedDate) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const onReturnDateChange = (event, selectedDate) => {
    setShowReturnPicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const showDeparturePickerModal = () => {
    setShowDeparturePicker(true);
  };

  const showReturnPickerModal = () => {
    setShowReturnPicker(true);
  };

  return (
    <View>
      <Text style={styles.label}>From & To</Text>
      <View style={styles.row}>
        <TextInput mode="outlined" label="From" style={styles.input} />
        <IconButton icon="swap-horizontal" size={24} />
        <TextInput mode="outlined" label="To" style={styles.input} />
      </View>

      <Text style={styles.label}>Departure & Return</Text>
      <Button 
        mode="outlined" 
        onPress={showDeparturePickerModal}
        style={styles.dateButton}
      >
        Departure: {departureDate.toLocaleDateString()}
      </Button>
      <Button 
        mode="outlined" 
        onPress={showReturnPickerModal}
        style={styles.dateButton}
      >
        Return: {returnDate.toLocaleDateString()}
      </Button>

      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDepartureDateChange}
        />
      )}

      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onReturnDateChange}
        />
      )}

      <TextInput mode="outlined" label="Class" style={styles.inputFull} />

      <Text style={styles.label}>Travelers</Text>
      <TextInput mode="outlined" label="Adults" keyboardType="number-pad" style={styles.inputFull} />
      <TextInput mode="outlined" label="Children" keyboardType="number-pad" style={styles.inputFull} />
      <TextInput mode="outlined" label="Infants (<2yrs)" keyboardType="number-pad" style={styles.inputFull} />

      <Button mode="contained" style={{ marginTop: 20 }}>Search Flights</Button>
    </View>
  );
};

export default RoundTripForm;

const styles = StyleSheet.create({
  label: { marginTop: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1 },
  inputFull: { width: '100%', marginTop: 10 },
  dateButton: { width: '100%', marginTop: 10 },
});
