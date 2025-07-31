import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Animated, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text, TextInput, Button, Surface, Chip, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MultiCityScreen = () => {
  const [segments, setSegments] = useState([
    {
      id: 1,
      from: '',
      to: '',
      date: new Date(),
      showDatePicker: false,
    }
  ]);
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

  const addSegment = () => {
    const newSegment = {
      id: Date.now(),
      from: '',
      to: '',
      date: new Date(),
      showDatePicker: false,
    };
    setSegments([...segments, newSegment]);
  };

  const removeSegment = (id) => {
    if (segments.length > 1) {
      setSegments(segments.filter(segment => segment.id !== id));
    }
  };

  const updateSegment = (id, field, value) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, [field]: value } : segment
    ));
  };

  const showDatePicker = (id) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, showDatePicker: true } : segment
    ));
  };

  const onDateChange = (id, event, selectedDate) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, showDatePicker: false } : segment
    ));
    
    if (selectedDate) {
      updateSegment(id, 'date', selectedDate);
    }
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

  const SegmentCard = ({ segment, index, onRemove }) => (
    <View style={styles.segmentCard}>
      <View style={styles.segmentHeader}>
        <View style={styles.segmentTitle}>
          <View style={styles.segmentIconContainer}>
            <Icon name="airplane" size={20} color="#4F46E5" />
          </View>
          <Text style={styles.segmentTitleText}>Flight {index + 1}</Text>
        </View>
        {segments.length > 1 && (
          <TouchableOpacity onPress={() => onRemove(segment.id)} style={styles.removeButton}>
            <View style={styles.removeButtonContainer}>
              <Icon name="close" size={16} color="#EF4444" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.segmentContent}>
        <View style={styles.routeContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="From"
              placeholder="Departure city"
              value={segment.from}
              onChangeText={(text) => updateSegment(segment.id, 'from', text)}
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
          
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="To"
              placeholder="Destination city"
              value={segment.to}
              onChangeText={(text) => updateSegment(segment.id, 'to', text)}
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
        
        <TouchableOpacity
          style={styles.dateCard}
          onPress={() => showDatePicker(segment.id)}
        >
          <View style={styles.dateCardContent}>
            <View style={styles.dateIconContainer}>
              <Icon name="calendar-range" size={24} color="#4F46E5" />
            </View>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Departure Date</Text>
              <Text style={styles.dateValue}>{segment.date.toLocaleDateString('en-US', {
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

        {segment.showDatePicker && (
          <DateTimePicker
            value={segment.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => onDateChange(segment.id, event, selectedDate)}
            minimumDate={new Date()}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Segments Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="map-marker-path" size={22} color="#4F46E5" />
              </View>
              <Text style={styles.sectionTitle}>Flight Segments</Text>
            </View>
            
            <View style={styles.segmentsContainer}>
              {segments.map((segment, index) => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  index={index}
                  onRemove={removeSegment}
                />
              ))}
              
              <TouchableOpacity style={styles.addSegmentButton} onPress={addSegment}>
                <LinearGradient
                  colors={['#F8FAFC', '#EEF2FF']}
                  style={styles.addSegmentGradient}
                >
                  <Icon name="plus" size={24} color="#4F46E5" />
                  <Text style={styles.addSegmentText}>Add Another Flight</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
            onPress={() => console.log('Search multi-city flights')}
          >
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              style={styles.searchButtonGradient}
            >
              <Icon name="magnify" size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search Multi-City Flights</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default MultiCityScreen;

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
  segmentsContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  segmentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  segmentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  segmentTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentContent: {
    padding: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  inputContainer: {
    flex: 1,
  },
  routeInput: {
    backgroundColor: '#FFFFFF',
    height: 56,
    fontSize: 16,
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
  addSegmentButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  addSegmentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  addSegmentText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
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
