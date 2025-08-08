import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform, 
  Animated,
  Easing, 
  TouchableOpacity, 
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
// Clean look: no gradients

const OneWayForm = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [swapAnim] = useState(new Animated.Value(0));
  const [ctaScale] = useState(new Animated.Value(1));
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

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onSwapRoute = () => {
    Animated.sequence([
      Animated.timing(swapAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(swapAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    setFromCity(prevFrom => {
      const newFrom = toCity;
      setToCity(prevFrom);
      return newFrom;
    });
  };

  const onPressInCta = () => {
    Animated.spring(ctaScale, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const onPressOutCta = () => {
    Animated.spring(ctaScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const swapRotate = swapAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

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

  const getTravelerSummary = () => {
    const adultsLabel = `${adults} Adult${adults !== 1 ? 's' : ''}`;
    const childrenLabel = `${children} Child${children !== 1 ? 'ren' : ''}`;
    const infantsLabel = `${infants} Infant${infants !== 1 ? 's' : ''}`;
    return `${adultsLabel}, ${childrenLabel}, ${infantsLabel}`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* From & To Section */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="airplane" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Flight Route</Text>
          </View>
          
          <View style={styles.routeContainer}>
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

        {/* Date Section */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="calendar" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Departure Date</Text>
          </View>
          
          <TouchableOpacity style={styles.dateCard} onPress={showDatePickerModal}>
            <View style={styles.dateCardContent}>
              <View style={styles.dateIconContainer}>
                <Ionicons name="calendar-outline" size={24} color="#007AFF" />
              </View>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Departure</Text>
                <Text style={styles.dateValue}>{departureDate.toLocaleDateString('en-US', { 
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
              value={departureDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Cabin Class - Dropdown / Bottom Sheet */}
        <View style={[styles.sectionCompact, styles.cabinCard]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconContainer, styles.iconCircleLarge]}>
              <Ionicons name="business" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Cabin Class</Text>
          </View>

          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setClassSheetVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownTriggerText}>{selectedClass}</Text>
            <Ionicons name="chevron-down" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={classSheetVisible}
          animationType="slide"
          onRequestClose={() => setClassSheetVisible(false)}
        >
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setClassSheetVisible(false)}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Select Cabin Class</Text>
              {classes.map((cabinClass) => (
                <TouchableOpacity
                  key={cabinClass}
                  style={styles.sheetItem}
                  onPress={() => {
                    setSelectedClass(cabinClass);
                    setClassSheetVisible(false);
                  }}
                >
                  <Text style={[styles.sheetItemText, selectedClass === cabinClass && styles.sheetItemTextSelected]}>
                    {cabinClass}
                  </Text>
                  {selectedClass === cabinClass && (
                    <Ionicons name="checkmark" size={18} color="#0A84FF" />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.sheetCancel} onPress={() => setClassSheetVisible(false)}>
                <Text style={styles.sheetCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Travelers - Compact Modal */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="people" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Travelers</Text>
          </View>

          <TouchableOpacity
            style={styles.travelersTrigger}
            onPress={() => setTravelerSheetVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.travelersTriggerText}>{getTravelerSummary()}</Text>
            <Ionicons name="chevron-down" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={travelerSheetVisible}
          animationType="slide"
          onRequestClose={() => setTravelerSheetVisible(false)}
        >
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setTravelerSheetVisible(false)}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Select Travelers</Text>

              {/* Adults Row */}
              <View style={styles.sheetRow}>
                <View style={styles.sheetRowLeft}>
                  <View style={styles.sheetRowAvatar}>
                    <Ionicons name="person" size={20} color="#0A84FF" />
                  </View>
                  <View>
                    <Text style={styles.sheetRowTitle}>Adults</Text>
                    <Text style={styles.sheetRowSubtitle}>12+ years</Text>
                  </View>
                </View>
                <View style={styles.sheetControls}>
                  <TouchableOpacity
                    style={[styles.counterButtonSmall, adults <= 1 && styles.disabledButton]}
                    onPress={() => setAdults(Math.max(adults - 1, 1))}
                    disabled={adults <= 1}
                  >
                    <Ionicons name="remove" size={16} color={adults <= 1 ? '#B0B4BD' : '#007AFF'} />
                  </TouchableOpacity>
                  <Text style={styles.counterTextSmall}>{adults}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonSmall}
                    onPress={() => setAdults(Math.min(adults + 1, 9))}
                  >
                    <Ionicons name="add" size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children Row */}
              <View style={styles.sheetRow}>
                <View style={styles.sheetRowLeft}>
                  <View style={styles.sheetRowAvatar}>
                    <Ionicons name="person-outline" size={20} color="#0A84FF" />
                  </View>
                  <View>
                    <Text style={styles.sheetRowTitle}>Children</Text>
                    <Text style={styles.sheetRowSubtitle}>2-11 years</Text>
                  </View>
                </View>
                <View style={styles.sheetControls}>
                  <TouchableOpacity
                    style={[styles.counterButtonSmall, children <= 0 && styles.disabledButton]}
                    onPress={() => setChildren(Math.max(children - 1, 0))}
                    disabled={children <= 0}
                  >
                    <Ionicons name="remove" size={16} color={children <= 0 ? '#B0B4BD' : '#007AFF'} />
                  </TouchableOpacity>
                  <Text style={styles.counterTextSmall}>{children}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonSmall}
                    onPress={() => setChildren(Math.min(children + 1, 8))}
                  >
                    <Ionicons name="add" size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Infants Row */}
              <View style={styles.sheetRow}>
                <View style={styles.sheetRowLeft}>
                  <View style={styles.sheetRowAvatar}>
                    <Ionicons name="person-circle-outline" size={20} color="#0A84FF" />
                  </View>
                  <View>
                    <Text style={styles.sheetRowTitle}>Infants</Text>
                    <Text style={styles.sheetRowSubtitle}>0-2 years</Text>
                  </View>
                </View>
                <View style={styles.sheetControls}>
                  <TouchableOpacity
                    style={[styles.counterButtonSmall, infants <= 0 && styles.disabledButton]}
                    onPress={() => setInfants(Math.max(infants - 1, 0))}
                    disabled={infants <= 0}
                  >
                    <Ionicons name="remove" size={16} color={infants <= 0 ? '#B0B4BD' : '#007AFF'} />
                  </TouchableOpacity>
                  <Text style={styles.counterTextSmall}>{infants}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonSmall}
                    onPress={() => setInfants(Math.min(infants + 1, 4))}
                  >
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
        <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <TouchableOpacity
            style={styles.searchButton}
            activeOpacity={0.9}
            onPressIn={onPressInCta}
            onPressOut={onPressOutCta}
            onPress={() => console.log('Search flights')}
          >
            <Ionicons name="search" size={18} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search Flights</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
};

export default OneWayForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  sectionCompact: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
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
  iconCircleLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EBF3FF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  routeContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    display: 'none',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
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
    marginHorizontal: 10,
  },
  swapButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  swapCenter: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  swapCenterInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  dateCard: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 2,
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 15,
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
  classContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 8,
  },
  classContainerRedesign: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 8,
  },
  classChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  classChipLarge: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F3F4F8',
    borderWidth: 1,
    borderColor: '#E2E5EE',
  },
  selectedClassChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  selectedClassChipLarge: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  classChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  classChipTextLarge: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A8F98',
  },
  selectedClassChipText: {
    color: '#FFFFFF',
  },
  selectedClassChipTextLarge: {
    color: '#FFFFFF',
  },
  cabinCard: {
    borderRadius: 20,
  },
  dropdownTrigger: {
    marginHorizontal: 12,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownTriggerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
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
  travelersTrigger: {
    marginHorizontal: 12,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 14,
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
  sheetRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetRowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sheetRowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  sheetRowSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  sheetControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  counterTextSmall: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 12,
    color: '#1C1C1E',
    minWidth: 22,
    textAlign: 'center',
  },
  sheetPrimary: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#0A84FF',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  sheetPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  travelersContainer: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 12,
  },
  travelerCard: {
    backgroundColor: '#F6F7FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAECF2',
    paddingVertical: 6,
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  travelerIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  travelerLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  travelerSubLabel: {
    fontSize: 13,
    color: '#8C90A1',
    fontWeight: '500',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAECF2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  disabledButton: {
    backgroundColor: '#F2F2F7',
    borderColor: '#E5E5EA',
  },
  counterText: {
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 18,
    color: '#1C1C1E',
    minWidth: 24,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
