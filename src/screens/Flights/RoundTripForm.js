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
  TextInput,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

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
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [swapAnim] = useState(new Animated.Value(0));
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

  const onSwapRoute = () => {
    Animated.sequence([
      Animated.timing(swapAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(swapAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();
    setFromCity(prev => {
      const newFrom = toCity;
      setToCity(prev);
      return newFrom;
    });
  };

  const swapRotate = swapAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] });

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

  const DateCard = ({ label, date, onPress, icon }) => (
    <TouchableOpacity style={styles.dateCard} onPress={onPress}>
      <View style={styles.dateCardContent}>
        <View style={styles.dateIconContainer}>
          <Ionicons name={icon} size={24} color="#007AFF" />
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
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
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
                <Ionicons name="airplane" size={22} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Flight Route</Text>
            </View>
            
            <View style={styles.routeContainerColumn}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="airplane-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Departure city"
                    placeholderTextColor="#8E8E93"
                    value={fromCity}
                    onChangeText={setFromCity}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.swapCenter} onPress={onSwapRoute}>
                <Animated.View style={[styles.swapCenterInner, { transform: [{ rotate: swapRotate }] }]}>
                  <Ionicons name="swap-vertical" size={20} color="#007AFF" />
                </Animated.View>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="airplane" size={20} color="#8E8E93" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Destination city"
                    placeholderTextColor="#8E8E93"
                    value={toCity}
                    onChangeText={setToCity}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Dates Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="calendar" size={22} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Travel Dates</Text>
            </View>
            
            <View style={styles.datesContainer}>
              <DateCard
                label="Departure"
                date={departureDate}
                onPress={showDeparturePickerModal}
                icon="airplane-outline"
              />
              
              <View style={styles.dateDivider}>
                <View style={styles.dividerLine} />
                <View style={styles.dividerIconContainer}>
                  <Ionicons name="arrow-forward" size={16} color="#007AFF" />
                </View>
                <View style={styles.dividerLine} />
              </View>
              
              <DateCard
                label="Return"
                date={returnDate}
                onPress={showReturnPickerModal}
                icon="airplane"
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

          {/* Class Selection - Dropdown */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="business" size={22} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Cabin Class</Text>
            </View>
            <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setClassSheetVisible(true)}>
              <Text style={styles.dropdownTriggerText}>{selectedClass}</Text>
              <Ionicons name="chevron-down" size={18} color="#8E8E93" />
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
                <Ionicons name="people" size={22} color="#007AFF" />
              </View>
              <Text style={styles.sectionTitle}>Travelers</Text>
            </View>
            <TouchableOpacity style={styles.travelersTrigger} onPress={() => setTravelerSheetVisible(true)}>
              <Text style={styles.travelersTriggerText}>{getTravelerSummary()}</Text>
              <Ionicons name="chevron-down" size={18} color="#8E8E93" />
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
          <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search round trip flights')}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search Round Trip Flights</Text>
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
    shadowColor: '#FFFFFF',
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
  // New column layout for stacked From/To with right-overlapping swap
  routeContainerColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
    gap: 6,
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
  // Right-overlapping swap button
  swapCenter: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    zIndex: 2,
    elevation: 3,
  },
  swapCenterInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  datesContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 12,
  },
  // Dropdown trigger (Cabin Class)
  dropdownTrigger: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownTriggerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  // Shared bottom sheet styles
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E5EA',
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  sheetItemText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  sheetItemTextSelected: {
    color: '#0A84FF',
    fontWeight: '700',
  },
  sheetCancel: {
    marginTop: 6,
    marginHorizontal: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  sheetCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  // Travelers compact trigger
  travelersTrigger: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  travelersTriggerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  sheetRowLeft: { flexDirection: 'row', alignItems: 'center' },
  sheetRowAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEF4FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sheetRowTitle: { fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
  sheetRowSubtitle: { fontSize: 12, color: '#8E8E93' },
  sheetControls: { flexDirection: 'row', alignItems: 'center' },
  counterButtonSmall: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E5EA' },
  counterTextSmall: { fontSize: 16, fontWeight: '700', marginHorizontal: 12, color: '#1C1C1E', minWidth: 22, textAlign: 'center' },
  sheetPrimary: { marginTop: 10, marginHorizontal: 16, backgroundColor: '#0A84FF', borderRadius: 12, alignItems: 'center', paddingVertical: 12 },
  sheetPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
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
