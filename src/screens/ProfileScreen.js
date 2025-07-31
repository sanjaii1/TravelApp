import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Avatar, Text, Button, Divider, List } from 'react-native-paper';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    // Add your theme switch logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: 'https://i.pravatar.cc/300' }}
        />
        <Text style={styles.name}>Sanjai Babu</Text>
        <Text style={styles.email}>sanjai@example.com</Text>
        <Text style={styles.phone}>+91 9876543210</Text>
      </View>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Item
          title="Edit Profile"
          left={() => <List.Icon icon="account-edit" />}
          onPress={() => console.log('Edit Profile')}
        />
        <List.Item
          title="Change Password"
          left={() => <List.Icon icon="lock-reset" />}
          onPress={() => console.log('Change Password')}
        />
        <List.Item
          title="Saved Addresses"
          left={() => <List.Icon icon="map-marker" />}
          onPress={() => console.log('Saved Addresses')}
        />
        <List.Item
          title="Trip History"
          left={() => <List.Icon icon="history" />}
          onPress={() => console.log('Trip History')}
        />
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={darkMode} onValueChange={handleToggleTheme} />
          )}
        />
      </List.Section>

      <Divider style={styles.divider} />

      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutButton}
        onPress={() => console.log('Logout')}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  phone: {
    fontSize: 16,
    color: '#777',
  },
  divider: {
    marginVertical: 15,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
});
