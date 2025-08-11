import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MulticityScreen from './MulticityScreen.js';

const { width, height } = Dimensions.get('window');

const TABS = [
  { label: 'One Way', icon: 'airplane' },
  { label: 'Round Trip', icon: 'airplane-takeoff' },
  { label: 'Multicity', icon: 'map-marker-path' },
];

const FlightHome = () => {
  const [activeTab, setActiveTab] = useState('One Way');

  const renderForm = () => {
    switch (activeTab) {
      case 'One Way':
        return <OneWayForm />;
      case 'Round Trip':
        return <RoundTripForm />;
      case 'Multicity':
        return <MulticityScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={['#007AFF', '#0056CC']}
          style={styles.headerGradient}
        >
          {/* Decorative background shapes */}
          <View style={styles.decorShapeLarge} />
          <View style={styles.decorShapeSmall} />

          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Icon name="airplane" size={32} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.headerTitle}>Book Your Flight</Text>
            <Text style={styles.headerSubtitle}>Choose your travel type</Text>
          </View>

          {/* Segmented tabs floating at header bottom */}
          <View style={styles.tabBarWrapper}>
            <View style={styles.tabBar}>
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab.label}
                  style={[
                    styles.tabButton,
                    activeTab === tab.label && styles.activeTabButton,
                  ]}
                  onPress={() => setActiveTab(tab.label)}
                >
                  <Icon
                    name={tab.icon}
                    size={20}
                    color={activeTab === tab.label ? '#FFFFFF' : '#007AFF'}
                    style={styles.tabIcon}
                  />
                  <Text style={[
                    styles.tabLabel,
                    activeTab === tab.label && styles.activeTabLabel
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </LinearGradient>
        
        {/* Content Container */}
        <View style={styles.contentContainer}>
          
          {/* Form Container */}
          <View style={styles.formContainer}>
            {renderForm()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightHome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 8,
    paddingBottom: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  decorShapeLarge: {
    position: 'absolute',
    right: -40,
    top: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  decorShapeSmall: {
    position: 'absolute',
    left: -30,
    bottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: { marginBottom: 6 },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#E2E8F0',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 14,
  },
  contentContainer: {
    flex: 1,
    marginTop: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F2F2F7',
    paddingTop: 12,
  },
  tabBarWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: -14,
  },
  tabBar: {
    marginHorizontal: 0,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabLabel: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 13,
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
});