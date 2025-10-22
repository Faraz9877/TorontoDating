import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface AuthFormData {
  phoneNumber: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const [step, setStep] = useState<'phone' | 'verify' | 'profile'>('phone');
  const [formData, setFormData] = useState<AuthFormData>({
    phoneNumber: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid Canadian phone number');
      return;
    }

    setLoading(true);
    // Simulate API call for phone verification
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
      Alert.alert('Verification Sent', 'Check your SMS for the verification code');
    }, 1500);
  };

  const handleVerificationSubmit = async () => {
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setStep('profile');
    }, 1000);
  };

  const handleProfileSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    // Simulate profile creation
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 1500);
  };

  const renderPhoneStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
        Welcome to Toronto Dating
      </Text>
      <Text style={[styles.stepSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
        Enter your Canadian phone number to get started
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
          Phone Number
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#333',
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          placeholder="+1 (416) 123-4567"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
          maxLength={15}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handlePhoneSubmit}
        disabled={loading}
      >
        <LinearGradient
          colors={['#ff6b6b', '#ee5a24']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Send Verification Code'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={[styles.disclaimer, { color: isDarkMode ? '#aaa' : '#777' }]}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
        Standard message rates may apply.
      </Text>
    </View>
  );

  const renderVerifyStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
        Verify Your Number
      </Text>
      <Text style={[styles.stepSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
        Enter the 6-digit code sent to {formData.phoneNumber}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
          Verification Code
        </Text>
        <TextInput
          style={[
            styles.input,
            styles.codeInput,
            {
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#333',
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          placeholder="123456"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={formData.verificationCode}
          onChangeText={(text) => setFormData({ ...formData, verificationCode: text })}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleVerificationSubmit}
        disabled={loading}
      >
        <LinearGradient
          colors={['#ff6b6b', '#ee5a24']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setStep('phone')}>
        <Text style={[styles.linkText, { color: isDarkMode ? '#ff6b6b' : '#ee5a24' }]}>
          Change phone number
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
        Complete Your Profile
      </Text>
      <Text style={[styles.stepSubtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
        Tell us a bit about yourself to get started
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
          First Name *
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#333',
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          placeholder="Enter your first name"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
          Last Name *
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#333',
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          placeholder="Enter your last name"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
          Email Address *
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#333',
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          placeholder="your.email@example.com"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleProfileSubmit}
        disabled={loading}
      >
        <LinearGradient
          colors={['#ff6b6b', '#ee5a24']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>🍁</Text>
        </View>

        {step === 'phone' && renderPhoneStep()}
        {step === 'verify' && renderVerifyStep()}
        {step === 'profile' && renderProfileStep()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  codeInput: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  submitButton: {
    height: 56,
    borderRadius: 28,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;