import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (email === 'bsanjay@gmail.com' && password === '123456') {
      navigation.navigate('Flights');
    // } else {
    //   Alert.alert('Login Failed', 'Invalid email or password');
    // }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login feature coming soon.');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <AntDesign name="google" size={20} color="#DB4437" style={styles.googleIcon} />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 16,
  },
  forgot: {
    color: '#007AFF',
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16 },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 14,
    color: '#777',
  },
  googleButton: {
    flexDirection: 'row',
    borderColor: '#DB4437',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleText: {
    color: '#DB4437',
    fontWeight: '500',
    fontSize: 16,
  },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 20 },
});
