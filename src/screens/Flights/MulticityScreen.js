import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform, 
  Animated, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  Text,
  TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons name={icon} size={20} color="#007AFF" />
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
            <Ionicons name="remove" size={16} color={count <= (label === 'Adults' ? 1 : 0) ? "#8E8E93" : "#007AFF"} />
          </TouchableOpacity>
          <Text style={styles.counterText}>{count}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={onIncrement}
          >
            <Ionicons name="add" size={16} color="#007AFF" />
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
            <Ionicons name="airplane" size={20} color="#007AFF" />
          </View>
          <Text style={styles.segmentTitleText}>Flight {index + 1}</Text>
        </View>
        {segments.length > 1 && (
          <TouchableOpacity onPress={() => onRemove(segment.id)} style={styles.removeButton}>
            <View style={styles.removeButtonContainer}>
              <Ionicons name="close" size={16} color="#FF3B30" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.segmentContent}>
        <View style={styles.routeContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="airplane-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Departure city"
                placeholderTextColor="#8E8E93"
                value={segment.from}
                onChangeText={(text) => updateSegment(segment.id, 'from', text)}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>To</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="airplane" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Destination city"
                placeholderTextColor="#8E8E93"
                value={segment.to}
                onChangeText={(text) => updateSegment(segment.id, 'to', text)}
              />
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.dateCard}
          onPress={() => showDatePicker(segment.id)}
        >
          <View style={styles.dateCardContent}>
            <View style={styles.dateIconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#007AFF" />
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
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
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
                <Ionicons name="map" size={22} color="#007AFF" />
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
                <View style={styles.addSegmentContainer}>
                  <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                  <Text style={styles.addSegmentText}>Add Another Flight</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Class Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="business" size={22} color="#007AFF" />
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
                  <Text style={[
                    styles.classChipText,
                    selectedClass === cabinClass && styles.selectedClassChipText
                  ]}>
                    {cabinClass}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Travelers Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="people" size={22} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Travelers</Text>
            </View>
            
            <View style={styles.travelersContainer}>
              <TravelerCounter
                label="Adults"
                count={adults}
                onIncrement={() => incrementTraveler('adults')}
                onDecrement={() => decrementTraveler('adults')}
                icon="person"
              />
              
              <TravelerCounter
                label="Children"
                count={children}
                onIncrement={() => incrementTraveler('children')}
                onDecrement={() => decrementTraveler('children')}
                icon="person-outline"
              />
              
              <TravelerCounter
                label="Infants"
                count={infants}
                onIncrement={() => incrementTraveler('infants')}
                onDecrement={() => decrementTraveler('infants')}
                icon="person-circle-outline"
              />
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search multi-city flights')}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search Multi-City Flights</Text>
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
    backgroundColor: '#F2F2F7',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
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
  segmentsContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 12,
  },
  segmentCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  segmentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  segmentTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE5E5',
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
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  dateCard: {
    backgroundColor: '#FFFFFF',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSegmentButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  addSegmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  addSegmentText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    paddingTop: 12,
    gap: 8,
  },
  classChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    minWidth: (width - 84) / 2,
    alignItems: 'center',
  },
  selectedClassChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  classChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  selectedClassChipText: {
    color: '#FFFFFF',
  },
  travelersContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 12,
  },
  travelerCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  travelerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  travelerSubLabel: {
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
