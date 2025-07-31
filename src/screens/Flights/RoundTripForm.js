import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Text, Button, IconButton, Surface, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RoundTripForm = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 7 days later
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [fadeAnim] = useState(new Animated.Value(0));

  const classes = ['Economy', 'Premium Economy', 'Business', 'First Class'];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onDepartureDateChange = (event, selectedDate) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
      // Auto-adjust return date if it's before departure
      if (returnDate < selectedDate) {
        setReturnDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000));
      }
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

  const incrementTraveler = (type) => {
    switch (type) {
      case 'adults':
        setAdults(Math.min(adults + 1, 9));
        break;
      case 'children':
        setChildren(Math.min(children + 1, 8));
        break;
      case 'infants':
        setInfants(Math.min(infants + 1, 4));
        break;
    }
  };

  const decrementTraveler = (type) => {
    switch (type) {
      case 'adults':
        setAdults(Math.max(adults - 1, 1));
        break;
      case 'children':
        setChildren(Math.max(children - 1, 0));
        break;
      case 'infants':
        setInfants(Math.max(infants - 1, 0));
        break;
    }
  };

  const TravelerCounter = ({ label, count, onIncrement, onDecrement, icon }) => (
    <Surface style={styles.travelerCard} elevation={1}>
      <View style={styles.travelerRow}>
        <View style={styles.travelerInfo}>
          <Icon name={icon} size={18} color="#6200ee" />
          <Text style={styles.travelerLabel}>{label}</Text>
        </View>
        <View style={styles.counterRow}>
          <TouchableOpacity
            style={[styles.counterButton, count <= (label === 'Adults' ? 1 : 0) && styles.disabledButton]}
            onPress={onDecrement}
            disabled={count <= (label === 'Adults' ? 1 : 0)}
          >
            <Icon name="minus" size={14} color={count <= (label === 'Adults' ? 1 : 0) ? "#ccc" : "#6200ee"} />
          </TouchableOpacity>
          <Text style={styles.counterText}>{count}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={onIncrement}
          >
            <Icon name="plus" size={14} color="#6200ee" />
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );

  const DateCard = ({ label, date, onPress, icon }) => (
    <TouchableOpacity style={styles.dateCard} onPress={onPress}>
      <View style={styles.dateContent}>
        <Icon name={icon} size={18} color="#6200ee" />
        <View style={styles.dateTextContainer}>
          <Text style={styles.dateLabel}>{label}</Text>
          <Text style={styles.dateValue}>{date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={18} color="#666" />
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* From & To Section */}
        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionHeader}>
            <Icon name="airplane" size={20} color="#6200ee" />
            <Text style={styles.sectionTitle}>Route</Text>
          </View>
          
          <View style={styles.routeContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="From"
                style={styles.routeInput}
                theme={{ colors: { primary: '#6200ee' } }}
                left={<TextInput.Icon icon="airplane-takeoff" />}
              />
            </View>
            
            <TouchableOpacity style={styles.swapButton}>
              <Icon name="swap-horizontal" size={20} color="#6200ee" />
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="To"
                style={styles.routeInput}
                theme={{ colors: { primary: '#6200ee' } }}
                left={<TextInput.Icon icon="airplane-landing" />}
              />
            </View>
          </View>
        </Surface>

        {/* Dates Section */}
        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionHeader}>
            <Icon name="calendar" size={20} color="#6200ee" />
            <Text style={styles.sectionTitle}>Travel Dates</Text>
          </View>
          
          <View style={styles.datesContainer}>
            <DateCard
              label="Departure"
              date={departureDate}
              onPress={showDeparturePickerModal}
              icon="airplane-takeoff"
            />
            
            <View style={styles.dateDivider}>
              <View style={styles.dividerLine} />
              <Icon name="arrow-right" size={14} color="#ccc" />
              <View style={styles.dividerLine} />
            </View>
            
            <DateCard
              label="Return"
              date={returnDate}
              onPress={showReturnPickerModal}
              icon="airplane-landing"
            />
          </View>

          {showDeparturePicker && (
            <DateTimePicker
              value={departureDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDepartureDateChange}
              minimumDate={new Date()}
            />
          )}

          {showReturnPicker && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onReturnDateChange}
              minimumDate={departureDate}
            />
          )}
        </Surface>

        {/* Class Selection */}
        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionHeader}>
            <Icon name="seat" size={20} color="#6200ee" />
            <Text style={styles.sectionTitle}>Cabin Class</Text>
          </View>
          
          <View style={styles.classContainer}>
            {classes.map((cabinClass) => (
              <Chip
                key={cabinClass}
                selected={selectedClass === cabinClass}
                onPress={() => setSelectedClass(cabinClass)}
                style={[
                  styles.classChip,
                  selectedClass === cabinClass && styles.selectedClassChip
                ]}
                textStyle={[
                  styles.classChipText,
                  selectedClass === cabinClass && styles.selectedClassChipText
                ]}
              >
                {cabinClass}
              </Chip>
            ))}
          </View>
        </Surface>

        {/* Travelers Section */}
        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionHeader}>
            <Icon name="account-group" size={20} color="#6200ee" />
            <Text style={styles.sectionTitle}>Travelers</Text>
          </View>
          
          <TravelerCounter
            label="Adults"
            count={adults}
            onIncrement={() => incrementTraveler('adults')}
            onDecrement={() => decrementTraveler('adults')}
            icon="account"
          />
          
          <TravelerCounter
            label="Children"
            count={children}
            onIncrement={() => incrementTraveler('children')}
            onDecrement={() => decrementTraveler('children')}
            icon="account-child"
          />
          
          <TravelerCounter
            label="Infants"
            count={infants}
            onIncrement={() => incrementTraveler('infants')}
            onDecrement={() => decrementTraveler('infants')}
            icon="baby-face"
          />
        </Surface>

        {/* Search Button */}
        <Button
          mode="contained"
          style={styles.searchButton}
          labelStyle={styles.searchButtonText}
          onPress={() => console.log('Search flights')}
        >
          <Icon name="magnify" size={18} color="#fff" style={{ marginRight: 6 }} />
          Search Flights
        </Button>
      </ScrollView>
    </Animated.View>
  );
};

export default RoundTripForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 6,
  },
  inputContainer: {
    flex: 1,
  },
  routeInput: {
    backgroundColor: '#f8f9fa',
    height: 48,
  },
  swapButton: {
    padding: 6,
    marginHorizontal: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  datesContainer: {
    padding: 12,
    paddingTop: 6,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    marginBottom: 6,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateTextContainer: {
    marginLeft: 10,
  },
  dateLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 1,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    paddingTop: 6,
    gap: 6,
  },
  classChip: {
    marginBottom: 6,
    backgroundColor: '#f8f9fa',
  },
  selectedClassChip: {
    backgroundColor: '#6200ee',
  },
  classChipText: {
    color: '#666',
    fontSize: 12,
  },
  selectedClassChipText: {
    color: '#fff',
    fontSize: 12,
  },
  travelerCard: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  travelerLabel: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 12,
    color: '#333',
    minWidth: 18,
    textAlign: 'center',
  },
  searchButton: {
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
