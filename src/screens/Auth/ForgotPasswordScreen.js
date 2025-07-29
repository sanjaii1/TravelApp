import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Input Required', 'Please enter your email or phone number');
      return;
    }

    // Dummy logic
    Alert.alert('Reset Link Sent', `Password reset instructions sent to ${email}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <Text style={styles.subtitle}>
        Enter your registered email or phone number. We’ll send you a link to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#555' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16 },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 20 },
});
