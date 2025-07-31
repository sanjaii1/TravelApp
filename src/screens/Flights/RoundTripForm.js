import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Animated, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { TextInput, Text, Button, IconButton, Surface, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
    <View style={styles.travelerCard}>
      <View style={styles.travelerRow}>
        <View style={styles.travelerInfo}>
          <View style={styles.travelerIconContainer}>
            <Icon name={icon} size={20} color="#4F46E5" />
          </View>
          <View>
            <Text style={styles.travelerLabel}>{label}</Text>
            <Text style={styles.travelerSubLabel}>
              {label === 'Adults' ? '12+ years' : label === 'Children' ? '2-11 years' : '0-2 years'}
            </Text>
          </View>
        </View>
        <View style={styles.counterRow}>
          <TouchableOpacity
            style={[styles.counterButton, count <= (label === 'Adults' ? 1 : 0) && styles.disabledButton]}
            onPress={onDecrement}
            disabled={count <= (label === 'Adults' ? 1 : 0)}
          >
            <Icon name="minus" size={16} color={count <= (label === 'Adults' ? 1 : 0) ? "#9CA3AF" : "#4F46E5"} />
          </TouchableOpacity>
          <Text style={styles.counterText}>{count}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={onIncrement}
          >
            <Icon name="plus" size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const DateCard = ({ label, date, onPress, icon }) => (
    <TouchableOpacity style={styles.dateCard} onPress={onPress}>
      <View style={styles.dateCardContent}>
        <View style={styles.dateIconContainer}>
          <Icon name={icon} size={24} color="#4F46E5" />
        </View>
        <View style={styles.dateTextContainer}>
          <Text style={styles.dateLabel}>{label} Date</Text>
          <Text style={styles.dateValue}>{date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</Text>
        </View>
        <View style={styles.dateArrowContainer}>
          <Icon name="chevron-right" size={20} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* From & To Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="airplane" size={22} color="#4F46E5" />
              </View>
              <Text style={styles.sectionTitle}>Flight Route</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="From"
                  placeholder="Departure city"
                  style={styles.routeInput}
                  theme={{
                    colors: {
                      primary: '#4F46E5',
                      outline: '#E5E7EB',
                      background: '#FFFFFF'
                    }
                  }}
                  left={<TextInput.Icon icon="airplane-takeoff" color="#6B7280" />}
                />
              </View>
              
              <TouchableOpacity style={styles.swapButton}>
                <LinearGradient
                  colors={['#4F46E5', '#7C3AED']}
                  style={styles.swapButtonGradient}
                >
                  <Icon name="swap-horizontal" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="To"
                  placeholder="Destination city"
                  style={styles.routeInput}
                  theme={{
                    colors: {
                      primary: '#4F46E5',
                      outline: '#E5E7EB',
                      background: '#FFFFFF'
                    }
                  }}
                  left={<TextInput.Icon icon="airplane-landing" color="#6B7280" />}
                />
              </View>
            </View>
          </View>

          {/* Dates Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="calendar" size={22} color="#4F46E5" />
              </View>
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
                <View style={styles.dividerIconContainer}>
                  <Icon name="arrow-right" size={16} color="#4F46E5" />
                </View>
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
          </View>

          {/* Class Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="seat" size={22} color="#4F46E5" />
              </View>
              <Text style={styles.sectionTitle}>Cabin Class</Text>
            </View>
            
            <View style={styles.classContainer}>
              {classes.map((cabinClass) => (
                <TouchableOpacity
                  key={cabinClass}
                  style={[
                    styles.classChip,
                    selectedClass === cabinClass && styles.selectedClassChip
                  ]}
                  onPress={() => setSelectedClass(cabinClass)}
                >
                  {selectedClass === cabinClass ? (
                    <LinearGradient
                      colors={['#4F46E5', '#7C3AED']}
                      style={styles.selectedClassGradient}
                    >
                      <Text style={styles.selectedClassChipText}>{cabinClass}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.classChipText}>{cabinClass}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Travelers Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="account-group" size={22} color="#4F46E5" />
              </View>
              <Text style={styles.sectionTitle}>Travelers</Text>
            </View>
            
            <View style={styles.travelersContainer}>
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
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => console.log('Search flights')}
          >
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              style={styles.searchButtonGradient}
            >
              <Icon name="magnify" size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search Round Trip Flights</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default RoundTripForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  inputContainer: {
    flex: 1,
  },
  routeInput: {
    backgroundColor: '#FFFFFF',
    height: 56,
    fontSize: 16,
  },
  swapButton: {
    marginHorizontal: 12,
  },
  swapButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  datesContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  dateCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  dateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  dateArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
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
    backgroundColor: '#E2E8F0',
  },
  dividerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  classChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minWidth: (width - 84) / 2,
    alignItems: 'center',
  },
  selectedClassChip: {
    borderColor: '#4F46E5',
    backgroundColor: 'transparent',
  },
  selectedClassGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: (width - 88) / 2,
  },
  classChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedClassChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  travelersContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  travelerCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  travelerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  travelerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  travelerSubLabel: {
    fontSize: 12,
    color: '#64748B',
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
    borderWidth: 2,
    borderColor: '#E2E8F0',
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
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    color: '#1E293B',
    minWidth: 24,
    textAlign: 'center',
  },
  searchButton: {
    marginTop: 32,
    marginHorizontal: 4,
  },
  searchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
