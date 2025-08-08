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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CabOneWay from './CabOneWay';

const { width, height } = Dimensions.get('window');

const TABS = [
  { label: 'One Way', icon: 'car' },
  { label: 'Round Trip', icon: 'car-sport' },
  { label: 'Rental', icon: 'car-outline' },
];

export default function CabHome() {
  const [activeTab, setActiveTab] = useState('One Way');

  const renderForm = () => {
    switch (activeTab) {
      case 'One Way':
        return <CabOneWay />;
      case 'Round Trip':
        return <CabOneWay />; // You can create separate components for these
      case 'Rental':
        return <CabOneWay />; // You can create separate components for these
      default:
        return <CabOneWay />;
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
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="car" size={32} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.headerTitle}>Book Your Cab</Text>
            <Text style={styles.headerSubtitle}>Choose your ride type</Text>
          </View>
        </LinearGradient>
        
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Tab Bar */}
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
                <Ionicons
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
          
          {/* Form Container */}
          <View style={styles.formContainer}>
            {renderForm()}
          </View>
        </View>
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
  headerGradient: {
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: { marginBottom: 8 },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 16,
  },
  contentContainer: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F2F2F7',
    paddingTop: 12,
  },
  tabBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 3,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
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
