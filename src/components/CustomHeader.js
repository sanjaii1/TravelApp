// components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>FairYaatra</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-circle-outline" size={26} color="#007BFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default CustomHeader;
