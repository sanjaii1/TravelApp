import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  ScrollView,
  Text,
  TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function CabOneWay() {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [passengers, setPassengers] = useState(1);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPickupDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const incrementPassengers = () => {
    setPassengers(Math.min(passengers + 1, 6));
  };

  const decrementPassengers = () => {
    setPassengers(Math.max(passengers - 1, 1));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Route Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="location" size={22} color="#007AFF" />
          </View>
          <Text style={styles.sectionTitle}>Route Details</Text>
        </View>
        
        <View style={styles.routeContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Pickup Location</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter pickup location"
                placeholderTextColor="#8E8E93"
                value={pickupLocation}
                onChangeText={setPickupLocation}
              />
            </View>
          </View>
          
          <View style={styles.swapButton}>
            <View style={styles.swapButtonContainer}>
              <Ionicons name="swap-vertical" size={20} color="#007AFF" />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Drop Location</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter drop location"
                placeholderTextColor="#8E8E93"
                value={dropLocation}
                onChangeText={setDropLocation}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Date Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="calendar" size={22} color="#007AFF" />
          </View>
          <Text style={styles.sectionTitle}>Pickup Date & Time</Text>
        </View>
        
        <TouchableOpacity style={styles.dateCard} onPress={showDatePickerModal}>
          <View style={styles.dateCardContent}>
            <View style={styles.dateIconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Pickup Date</Text>
              <Text style={styles.dateValue}>{pickupDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</Text>
            </View>
            <View style={styles.dateArrowContainer}>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </View>
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={pickupDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      {/* Passengers Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="people" size={22} color="#007AFF" />
          </View>
          <Text style={styles.sectionTitle}>Passengers</Text>
        </View>
        
        <View style={styles.passengersContainer}>
          <View style={styles.passengerCard}>
            <View style={styles.passengerRow}>
              <View style={styles.passengerInfo}>
                <View style={styles.passengerIconContainer}>
                  <Ionicons name="person" size={20} color="#007AFF" />
                </View>
                <View>
                  <Text style={styles.passengerLabel}>Passengers</Text>
                  <Text style={styles.passengerSubLabel}>Select number of passengers</Text>
                </View>
              </View>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={[styles.counterButton, passengers <= 1 && styles.disabledButton]}
                  onPress={decrementPassengers}
                  disabled={passengers <= 1}
                >
                  <Ionicons name="remove" size={16} color={passengers <= 1 ? "#8E8E93" : "#007AFF"} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{passengers}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={incrementPassengers}
                >
                  <Ionicons name="add" size={16} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search cabs')}>
        <Ionicons name="search" size={20} color="#FFFFFF" />
        <Text style={styles.searchButtonText}>Search Cabs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    paddingVertical: 0,
  },
  swapButton: {
    marginHorizontal: 12,
  },
  swapButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCard: {
    margin: 16,
    marginTop: 12,
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
  },
  dateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  dateArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengersContainer: {
    padding: 16,
    paddingTop: 12,
  },
  passengerCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  passengerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  passengerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  passengerSubLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#F2F2F7',
    borderColor: '#E5E5EA',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    color: '#1C1C1E',
    minWidth: 24,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
