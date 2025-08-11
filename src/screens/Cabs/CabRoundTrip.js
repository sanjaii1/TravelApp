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
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function CabRoundTrip() {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Next day
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [swapAnim] = useState(new Animated.Value(0));
  const [ctaScale] = useState(new Animated.Value(1));
  const [cabTypeSheetVisible, setCabTypeSheetVisible] = useState(false);
  const [selectedCabType, setSelectedCabType] = useState('Standard');
  
  const cabTypes = ['Economy', 'Standard', 'Premium', 'Luxury'];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPickupDateChange = (event, selectedDate) => {
    setShowPickupDatePicker(false);
    if (selectedDate) {
      setPickupDate(selectedDate);
      // Auto-adjust return date if it's before pickup
      if (returnDate < selectedDate) {
        setReturnDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
      }
    }
  };

  const onReturnDateChange = (event, selectedDate) => {
    setShowReturnDatePicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const showPickupDatePickerModal = () => {
    setShowPickupDatePicker(true);
  };

  const showReturnDatePickerModal = () => {
    setShowReturnDatePicker(true);
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

    setPickupLocation(prevPickup => {
      const newPickup = dropLocation;
      setDropLocation(prevPickup);
      return newPickup;
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

  const incrementPassengers = () => {
    setPassengers(Math.min(passengers + 1, 6));
  };

  const decrementPassengers = () => {
    setPassengers(Math.max(passengers - 1, 1));
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Route Section */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="location" size={18} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Cab Route</Text>
          </View>
          
          <View style={styles.routeContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={16} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Pickup location"
                  placeholderTextColor="#8E8E93"
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                />
              </View>
            </View>
            
            <TouchableOpacity style={styles.swapCenter} onPress={onSwapRoute}>
              <Animated.View style={[styles.swapCenterInner, { transform: [{ rotate: swapRotate }] }]}> 
                <Ionicons name="swap-vertical" size={18} color="#007AFF" />
              </Animated.View>
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="location" size={16} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Drop location"
                  placeholderTextColor="#8E8E93"
                  value={dropLocation}
                  onChangeText={setDropLocation}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Date Section */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="calendar" size={18} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Trip Dates</Text>
          </View>
          
          {/* Pickup Date */}
          <TouchableOpacity style={styles.dateCard} onPress={showPickupDatePickerModal}>
            <View style={styles.dateCardContent}>
              <View style={styles.dateIconContainer}>
                <Ionicons name="calendar-outline" size={14} color="#007AFF" />
              </View>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Pickup</Text>
                <Text style={styles.dateValue}>{pickupDate.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</Text>
              </View>
              <View style={styles.dateArrowContainer}>
                <Ionicons name="chevron-forward" size={14} color="#8E8E93" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Return Date */}
          <TouchableOpacity style={[styles.dateCard, styles.returnDateCard]} onPress={showReturnDatePickerModal}>
            <View style={styles.dateCardContent}>
              <View style={styles.dateIconContainer}>
                <Ionicons name="calendar-outline" size={14} color="#007AFF" />
              </View>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Return</Text>
                <Text style={styles.dateValue}>{returnDate.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</Text>
              </View>
              <View style={styles.dateArrowContainer}>
                <Ionicons name="chevron-forward" size={14} color="#8E8E93" />
              </View>
            </View>
          </TouchableOpacity>

          {showPickupDatePicker && (
            <DateTimePicker
              value={pickupDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onPickupDateChange}
              minimumDate={new Date()}
            />
          )}

          {showReturnDatePicker && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onReturnDateChange}
              minimumDate={pickupDate}
            />
          )}
        </View>
        
        {/* Cab Type - Dropdown / Bottom Sheet */}
        <View style={[styles.sectionCompact, styles.cabinCard]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconContainer, styles.iconCircleLarge]}>
              <Ionicons name="car" size={18} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Cab Type</Text>
          </View>
          
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setCabTypeSheetVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownTriggerText}>{selectedCabType}</Text>
            <Ionicons name="chevron-down" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={cabTypeSheetVisible}
          animationType="slide"
          onRequestClose={() => setCabTypeSheetVisible(false)}
        >
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setCabTypeSheetVisible(false)}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Select Cab Type</Text>
              {cabTypes.map((cabType) => (
                <TouchableOpacity
                  key={cabType}
                  style={styles.sheetItem}
                  onPress={() => {
                    setSelectedCabType(cabType);
                    setCabTypeSheetVisible(false);
                  }}
                >
                  <Text style={[styles.sheetItemText, selectedCabType === cabType && styles.sheetItemTextSelected]}>
                    {cabType}
                  </Text>
                  {selectedCabType === cabType && (
                    <Ionicons name="checkmark" size={18} color="#0A84FF" />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.sheetCancel} onPress={() => setCabTypeSheetVisible(false)}>
                <Text style={styles.sheetCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Passengers Section */}
        <View style={styles.sectionCompact}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="people" size={18} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Passengers</Text>
          </View>
          
          <View style={styles.travelerCard}>
            <View style={styles.travelerRow}>
              <View style={styles.travelerInfo}>
                <View style={styles.travelerIconContainer}>
                  <Ionicons name="person" size={16} color="#007AFF" />
                </View>
                <View>
                  <Text style={styles.travelerLabel}>Passengers</Text>
                  <Text style={styles.travelerSubLabel}>Select number of passengers</Text>
                </View>
              </View>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={[styles.counterButton, passengers <= 1 && styles.disabledButton]}
                  onPress={decrementPassengers}
                  disabled={passengers <= 1}
                >
                  <Ionicons name="remove" size={14} color={passengers <= 1 ? "#8E8E93" : "#007AFF"} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{passengers}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={incrementPassengers}
                >
                  <Ionicons name="add" size={14} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={() => console.log('Search round trip cabs')}
          onPressIn={onPressInCta}
          onPressOut={onPressOutCta}
          activeOpacity={0.9}
        >
          <Animated.View style={[styles.searchButtonInner, {transform: [{scale: ctaScale}]}]}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search Round Trip Cabs</Text>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionCompact: {
    marginBottom: 14,
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
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  sectionIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconCircleLarge: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  routeContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 6,
    position: 'relative',
    gap: 4,
  },
  inputContainer: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
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
    elevation: 3,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  dateCard: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  returnDateCard: {
    paddingTop: 4,
    paddingBottom: 6,
  },
  dateCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F9F9F9',
  },
  dateIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 1,
  },
  dateValue: {
    fontSize: 13,
    color: '#333333',
  },
  dateArrowContainer: {
    marginLeft: 8,
  },
  cabinCard: {
    paddingBottom: 16,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: '#333333',
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  sheetHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sheetItemText: {
    fontSize: 16,
    color: '#333333',
  },
  sheetItemTextSelected: {
    color: '#0A84FF',
    fontWeight: '500',
  },
  sheetCancel: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sheetCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  travelerCard: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    padding: 8,
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelerIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  travelerLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 1,
  },
  travelerSubLabel: {
    fontSize: 11,
    color: '#666666',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  counterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    marginHorizontal: 8,
  },
  searchButton: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  searchButtonInner: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});