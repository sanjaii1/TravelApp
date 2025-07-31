import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function HotelsHome() {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000)); // 1 day later
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const onCheckInDateChange = (event, selectedDate) => {
    setShowCheckIn(false);
    if (selectedDate) {
      setCheckInDate(selectedDate);
      // Auto-adjust checkout date if it's before checkin
      if (checkOutDate < selectedDate) {
        setCheckOutDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
      }
    }
  };

  const onCheckOutDateChange = (event, selectedDate) => {
    setShowCheckOut(false);
    if (selectedDate) {
      setCheckOutDate(selectedDate);
    }
  };

  const showCheckInPicker = () => {
    setShowCheckIn(true);
  };

  const showCheckOutPicker = () => {
    setShowCheckOut(true);
  };

  const incrementGuests = () => {
    setGuests(Math.min(guests + 1, 10));
  };

  const decrementGuests = () => {
    setGuests(Math.max(guests - 1, 1));
  };

  const incrementRooms = () => {
    setRooms(Math.min(rooms + 1, 5));
  };

  const decrementRooms = () => {
    setRooms(Math.max(rooms - 1, 1));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="bed" size={32} color="#007AFF" />
            </View>
          </View>
          <Text style={styles.headerTitle}>Find Your Perfect Stay</Text>
          <Text style={styles.headerSubtitle}>Book hotels with ease</Text>
        </View>

        {/* Destination Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="location" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Destination</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Where are you going?</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="search" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter destination or hotel name"
                placeholderTextColor="#8E8E93"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        </View>

        {/* Dates Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="calendar" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Check-in & Check-out</Text>
          </View>

          <View style={styles.datesContainer}>
            <TouchableOpacity style={styles.dateCard} onPress={showCheckInPicker}>
              <View style={styles.dateCardContent}>
                <View style={styles.dateIconContainer}>
                  <Ionicons name="log-in-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Check-in</Text>
                  <Text style={styles.dateValue}>{checkInDate.toLocaleDateString('en-US', {
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

            <View style={styles.dateDivider}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerIconContainer}>
                <Ionicons name="arrow-forward" size={16} color="#007AFF" />
              </View>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.dateCard} onPress={showCheckOutPicker}>
              <View style={styles.dateCardContent}>
                <View style={styles.dateIconContainer}>
                  <Ionicons name="log-out-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Check-out</Text>
                  <Text style={styles.dateValue}>{checkOutDate.toLocaleDateString('en-US', {
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
          </View>

          {showCheckIn && (
            <DateTimePicker
              value={checkInDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onCheckInDateChange}
              minimumDate={new Date()}
            />
          )}

          {showCheckOut && (
            <DateTimePicker
              value={checkOutDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onCheckOutDateChange}
              minimumDate={checkInDate}
            />
          )}
        </View>

        {/* Guests & Rooms Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="people" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Guests & Rooms</Text>
          </View>

          <View style={styles.guestsContainer}>
            <View style={styles.guestCard}>
              <View style={styles.guestRow}>
                <View style={styles.guestInfo}>
                  <View style={styles.guestIconContainer}>
                    <Ionicons name="person" size={20} color="#007AFF" />
                  </View>
                  <View>
                    <Text style={styles.guestLabel}>Guests</Text>
                    <Text style={styles.guestSubLabel}>Number of guests</Text>
                  </View>
                </View>
                <View style={styles.counterRow}>
                  <TouchableOpacity
                    style={[styles.counterButton, guests <= 1 && styles.disabledButton]}
                    onPress={decrementGuests}
                    disabled={guests <= 1}
                  >
                    <Ionicons name="remove" size={16} color={guests <= 1 ? "#8E8E93" : "#007AFF"} />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{guests}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={incrementGuests}
                  >
                    <Ionicons name="add" size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.guestCard}>
              <View style={styles.guestRow}>
                <View style={styles.guestInfo}>
                  <View style={styles.guestIconContainer}>
                    <Ionicons name="bed" size={20} color="#007AFF" />
                  </View>
                  <View>
                    <Text style={styles.guestLabel}>Rooms</Text>
                    <Text style={styles.guestSubLabel}>Number of rooms</Text>
                  </View>
                </View>
                <View style={styles.counterRow}>
                  <TouchableOpacity
                    style={[styles.counterButton, rooms <= 1 && styles.disabledButton]}
                    onPress={decrementRooms}
                    disabled={rooms <= 1}
                  >
                    <Ionicons name="remove" size={16} color={rooms <= 1 ? "#8E8E93" : "#007AFF"} />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{rooms}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={incrementRooms}
                  >
                    <Ionicons name="add" size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search hotels')}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <Text style={styles.searchButtonText}>Search Hotels</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginBottom: 16,
    marginHorizontal: 24,
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
  inputContainer: {
    padding: 16,
    paddingTop: 12,
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
  datesContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 12,
  },
  dateCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E5EA',
  },
  dividerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  guestsContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 12,
  },
  guestCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  guestIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  guestLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  guestSubLabel: {
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
    marginHorizontal: 24,
    marginBottom: 20,
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
