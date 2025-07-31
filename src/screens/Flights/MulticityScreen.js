import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface, Chip, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const SegmentCard = ({ segment, index, onRemove }) => (
    <Surface style={styles.segmentCard} elevation={1}>
      <View style={styles.segmentHeader}>
        <View style={styles.segmentTitle}>
          <Icon name="airplane" size={18} color="#6200ee" />
          <Text style={styles.segmentTitleText}>Segment {index + 1}</Text>
        </View>
        {segments.length > 1 && (
          <TouchableOpacity onPress={() => onRemove(segment.id)} style={styles.removeButton}>
            <Icon name="close" size={18} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.segmentContent}>
        <View style={styles.routeContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="From"
              value={segment.from}
              onChangeText={(text) => updateSegment(segment.id, 'from', text)}
              style={styles.routeInput}
              theme={{ colors: { primary: '#6200ee' } }}
              left={<TextInput.Icon icon="airplane-takeoff" />}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="To"
              value={segment.to}
              onChangeText={(text) => updateSegment(segment.id, 'to', text)}
              style={styles.routeInput}
              theme={{ colors: { primary: '#6200ee' } }}
              left={<TextInput.Icon icon="airplane-landing" />}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.dateCard} 
          onPress={() => showDatePicker(segment.id)}
        >
          <View style={styles.dateContent}>
            <Icon name="calendar-range" size={18} color="#6200ee" />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Departure</Text>
              <Text style={styles.dateValue}>{segment.date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={18} color="#666" />
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
    </Surface>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Segments Section */}
        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionHeader}>
            <Icon name="map-marker-path" size={20} color="#6200ee" />
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
              <Icon name="plus" size={20} color="#6200ee" />
              <Text style={styles.addSegmentText}>Add Another Segment</Text>
            </TouchableOpacity>
          </View>
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
          onPress={() => console.log('Search multi-city flights')}
        >
          <Icon name="magnify" size={18} color="#fff" style={{ marginRight: 6 }} />
          Search Multi-City Flights
        </Button>
      </ScrollView>
    </Animated.View>
  );
};

export default MultiCityScreen;

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
  segmentsContainer: {
    padding: 12,
    paddingTop: 6,
  },
  segmentCard: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  segmentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentTitleText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  segmentContent: {
    padding: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 3,
  },
  routeInput: {
    backgroundColor: '#fff',
    height: 48,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  addSegmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addSegmentText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#6200ee',
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
