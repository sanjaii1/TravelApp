import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    // Add your theme switch logic here
  };

  const profileMenuItems = [
    {
      title: 'Edit Profile',
      icon: 'person-outline',
      onPress: () => console.log('Edit Profile'),
    },
    {
      title: 'Change Password',
      icon: 'lock-closed-outline',
      onPress: () => console.log('Change Password'),
    },
    {
      title: 'Saved Addresses',
      icon: 'location-outline',
      onPress: () => console.log('Saved Addresses'),
    },
    {
      title: 'Trip History',
      icon: 'time-outline',
      onPress: () => console.log('Trip History'),
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => console.log('Notifications'),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => console.log('Help & Support'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="person" size={32} color="#007AFF" />
            </View>
          </View>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account settings</Text>
        </View>

        {/* Profile Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="person-circle" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Profile Information</Text>
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://i.pravatar.cc/300' }}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Sanjai Babu</Text>
              <Text style={styles.userEmail}>sanjai@example.com</Text>
              <Text style={styles.userPhone}>+91 9876543210</Text>
            </View>
          </View>
        </View>

        {/* Menu Items Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="settings" size={22} color="#007AFF" />
            </View>
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>

          <View style={styles.menuContainer}>
            {profileMenuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === profileMenuItems.length - 1 && styles.lastMenuItem
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon} size={20} color="#007AFF" />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
                </View>
              </TouchableOpacity>
            ))}

            {/* Dark Mode Toggle */}
            <View style={[styles.menuItem, styles.lastMenuItem]}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="moon-outline" size={20} color="#007AFF" />
                </View>
                <Text style={styles.menuItemText}>Dark Mode</Text>
              </View>
              <View style={styles.menuItemRight}>
                <Switch
                  value={darkMode}
                  onValueChange={handleToggleTheme}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#E5E5EA"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logout')}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginBottom: 16,
    marginHorizontal: 24,
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
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2F2F7',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#8E8E93',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  menuItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 20,
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
