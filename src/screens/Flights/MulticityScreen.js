import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform, 
  Animated, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  Text,
  TextInput,
  Modal
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
  const [classSheetVisible, setClassSheetVisible] = useState(false);
  const [travelerSheetVisible, setTravelerSheetVisible] = useState(false);

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

  const swapSegmentRoute = (id) => {
    setSegments(segments.map(segment =>
      segment.id === id ? { ...segment, from: segment.to, to: segment.from } : segment
    ));
  };

  const showDatePicker = (id) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, showDatePicker: true } : segment
    ));
  };

  const onDateChange = (id, event, selectedDate) => {
    setSegments(prevSegments =>
      prevSegments.map(segment => {
        if (segment.id !== id) return segment;
        const updated = { ...segment, showDatePicker: false };
        if (selectedDate) {
          updated.date = selectedDate;
        }
        return updated;
      })
    );
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

  const getTravelerSummary = () => {
    const a = `${adults} Adult${adults !== 1 ? 's' : ''}`;
    const c = `${children} Child${children !== 1 ? 'ren' : ''}`;
    const i = `${infants} Infant${infants !== 1 ? 's' : ''}`;
    return `${a}, ${c}, ${i}`;
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

  const SegmentCard = ({ segment, index, onRemove }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const onSwap = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]).start();
      swapSegmentRoute(segment.id);
    };

    const rotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] });

    return (
      <View style={styles.segmentCard}>
        <View style={styles.segmentHeader}>
          <View style={styles.segmentTitle}>
            <View style={styles.segmentIconContainer}>
              <Ionicons name="airplane" size={18} color="#007AFF" />
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
          <View style={styles.routeContainerColumn}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="airplane-outline" size={16} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Departure city"
                  placeholderTextColor="#8E8E93"
                  value={segment.from}
                  onChangeText={(text) => updateSegment(segment.id, 'from', text)}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.swapCenter} onPress={onSwap}>
              <Animated.View style={[styles.swapCenterInner, { transform: [{ rotate }] }]}>
                <Ionicons name="swap-vertical" size={18} color="#007AFF" />
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="airplane" size={16} color="#8E8E93" style={styles.inputIcon} />
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

          <TouchableOpacity style={styles.dateCard} onPress={() => showDatePicker(segment.id)}>
            <View style={styles.dateCardContent}>
              <View style={styles.dateIconContainer}>
                <Ionicons name="calendar-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Departure Date</Text>
                <Text style={styles.dateValue}>{segment.date.toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}</Text>
              </View>
              <View style={styles.dateArrowContainer}>
                <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
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
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Segments Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="map" size={18} color="#007AFF" />
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
                  <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                  <Text style={styles.addSegmentText}>Add Another Flight</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Class Selection - Dropdown */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="business" size={18} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Cabin Class</Text>
            </View>
            <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setClassSheetVisible(true)}>
              <Text style={styles.dropdownTriggerText}>{selectedClass}</Text>
              <Ionicons name="chevron-down" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Modal transparent visible={classSheetVisible} animationType="slide" onRequestClose={() => setClassSheetVisible(false)}>
            <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setClassSheetVisible(false)}>
              <View style={styles.sheetContainer}>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetTitle}>Select Cabin Class</Text>
                {classes.map(c => (
                  <TouchableOpacity key={c} style={styles.sheetItem} onPress={() => { setSelectedClass(c); setClassSheetVisible(false); }}>
                    <Text style={[styles.sheetItemText, selectedClass === c && styles.sheetItemTextSelected]}>{c}</Text>
                    {selectedClass === c && <Ionicons name="checkmark" size={18} color="#0A84FF" />}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.sheetCancel} onPress={() => setClassSheetVisible(false)}>
                  <Text style={styles.sheetCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Travelers - Compact Modal */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="people" size={18} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Travelers</Text>
            </View>
            <TouchableOpacity style={styles.travelersTrigger} onPress={() => setTravelerSheetVisible(true)}>
              <Text style={styles.travelersTriggerText}>{getTravelerSummary()}</Text>
              <Ionicons name="chevron-down" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <Modal transparent visible={travelerSheetVisible} animationType="slide" onRequestClose={() => setTravelerSheetVisible(false)}>
            <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setTravelerSheetVisible(false)}>
              <View style={styles.sheetContainer}>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetTitle}>Select Travelers</Text>

                {/* Adults */}
                <View style={styles.sheetRow}>
                  <View style={styles.sheetRowLeft}>
                    <View style={styles.sheetRowAvatar}><Ionicons name="person" size={20} color="#0A84FF" /></View>
                    <View><Text style={styles.sheetRowTitle}>Adults</Text><Text style={styles.sheetRowSubtitle}>12+ years</Text></View>
                  </View>
                  <View style={styles.sheetControls}>
                    <TouchableOpacity style={[styles.counterButtonSmall, adults <= 1 && styles.disabledButton]} onPress={() => setAdults(Math.max(adults - 1, 1))} disabled={adults <= 1}>
                      <Ionicons name="remove" size={16} color={adults <= 1 ? '#B0B4BD' : '#007AFF'} />
                    </TouchableOpacity>
                    <Text style={styles.counterTextSmall}>{adults}</Text>
                    <TouchableOpacity style={styles.counterButtonSmall} onPress={() => setAdults(Math.min(adults + 1, 9))}>
                      <Ionicons name="add" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children */}
                <View style={styles.sheetRow}>
                  <View style={styles.sheetRowLeft}>
                    <View style={styles.sheetRowAvatar}><Ionicons name="person-outline" size={20} color="#0A84FF" /></View>
                    <View><Text style={styles.sheetRowTitle}>Children</Text><Text style={styles.sheetRowSubtitle}>2-11 years</Text></View>
                  </View>
                  <View style={styles.sheetControls}>
                    <TouchableOpacity style={[styles.counterButtonSmall, children <= 0 && styles.disabledButton]} onPress={() => setChildren(Math.max(children - 1, 0))} disabled={children <= 0}>
                      <Ionicons name="remove" size={16} color={children <= 0 ? '#B0B4BD' : '#007AFF'} />
                    </TouchableOpacity>
                    <Text style={styles.counterTextSmall}>{children}</Text>
                    <TouchableOpacity style={styles.counterButtonSmall} onPress={() => setChildren(Math.min(children + 1, 8))}>
                      <Ionicons name="add" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Infants */}
                <View style={styles.sheetRow}>
                  <View style={styles.sheetRowLeft}>
                    <View style={styles.sheetRowAvatar}><Ionicons name="person-circle-outline" size={20} color="#0A84FF" /></View>
                    <View><Text style={styles.sheetRowTitle}>Infants</Text><Text style={styles.sheetRowSubtitle}>0-2 years</Text></View>
                  </View>
                  <View style={styles.sheetControls}>
                    <TouchableOpacity style={[styles.counterButtonSmall, infants <= 0 && styles.disabledButton]} onPress={() => setInfants(Math.max(infants - 1, 0))} disabled={infants <= 0}>
                      <Ionicons name="remove" size={16} color={infants <= 0 ? '#B0B4BD' : '#007AFF'} />
                    </TouchableOpacity>
                    <Text style={styles.counterTextSmall}>{infants}</Text>
                    <TouchableOpacity style={styles.counterButtonSmall} onPress={() => setInfants(Math.min(infants + 1, 4))}>
                      <Ionicons name="add" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.sheetPrimary} onPress={() => setTravelerSheetVisible(false)}>
                  <Text style={styles.sheetPrimaryText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search multi-city flights')}>
            <Ionicons name="search" size={16} color="#FFFFFF" />
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
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#ffffff',
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
    padding: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  segmentsContainer: {
    padding: 12,
    paddingTop: 10,
    gap: 10,
  },
  segmentCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  segmentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  segmentTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentContent: {
    padding: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  routeContainerColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 16,
    gap: 4,
    position: 'relative',
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
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
    paddingVertical: 0,
  },
  swapCenter: { 
    position: 'absolute', 
    right: 12, 
    top: '50%', 
    marginTop: -16, 
    zIndex: 2, 
    elevation: 3 
  },
  swapCenterInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  dateArrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSegmentButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  addSegmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  addSegmentText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    paddingTop: 10,
    gap: 8,
  },
  dropdownTrigger: { 
    marginHorizontal: 12, 
    marginTop: 10, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#F2F2F7', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
    paddingHorizontal: 12, 
    paddingVertical: 10 
  },
  dropdownTriggerText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1C1C1E' 
  },
  sheetBackdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.25)', 
    justifyContent: 'flex-end' 
  },
  sheetContainer: { 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 14, 
    borderTopRightRadius: 14, 
    paddingBottom: 18, 
    paddingTop: 6 
  },
  sheetHandle: { 
    alignSelf: 'center', 
    width: 36, 
    height: 4, 
    borderRadius: 2, 
    backgroundColor: '#E5E5EA', 
    marginBottom: 6 
  },
  sheetTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#1C1C1E', 
    paddingHorizontal: 14, 
    paddingBottom: 6 
  },
  sheetItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#F2F2F7' 
  },
  sheetItemText: { 
    fontSize: 14, 
    color: '#1C1C1E', 
    fontWeight: '500' 
  },
  sheetItemTextSelected: { 
    color: '#0A84FF', 
    fontWeight: '700' 
  },
  sheetCancel: { 
    marginTop: 6, 
    marginHorizontal: 14, 
    backgroundColor: '#F2F2F7', 
    borderRadius: 10, 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  sheetCancelText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1C1C1E' 
  },

  travelersTrigger: { 
    marginHorizontal: 12, 
    marginTop: 10, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#F2F2F7', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
    paddingHorizontal: 12, 
    paddingVertical: 10 
  },
  travelersTriggerText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1C1C1E' 
  },
  sheetRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#F2F2F7' 
  },
  sheetRowLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  sheetRowAvatar: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    backgroundColor: '#EEF4FF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 8 
  },
  sheetRowTitle: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#1C1C1E' 
  },
  sheetRowSubtitle: { 
    fontSize: 11, 
    color: '#8E8E93' 
  },
  sheetControls: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  counterButtonSmall: { 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E5EA' 
  },
  counterTextSmall: { 
    fontSize: 14, 
    fontWeight: '700', 
    marginHorizontal: 10, 
    color: '#1C1C1E', 
    minWidth: 20, 
    textAlign: 'center' 
  },
  sheetPrimary: { 
    marginTop: 8, 
    marginHorizontal: 14, 
    backgroundColor: '#0A84FF', 
    borderRadius: 10, 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  sheetPrimaryText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '700' 
  },
  classChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
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
    padding: 12,
    paddingTop: 10,
    gap: 10,
  },
  travelerCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  travelerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  travelerLabel: {
    fontSize: 14,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    color: '#1C1C1E',
    minWidth: 22,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
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
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
});
