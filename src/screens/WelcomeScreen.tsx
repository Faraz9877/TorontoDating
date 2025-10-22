import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const { width, height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const handleGetStarted = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      {/* Background with Toronto skyline gradient */}
      <LinearGradient
        colors={[
          isDarkMode ? '#1a1a2e' : '#16537e',
          isDarkMode ? '#16213e' : '#0f3460',
          isDarkMode ? '#0f3460' : '#533483',
        ]}
        style={styles.background}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.appName}>Toronto Dating</Text>
          <Text style={styles.tagline}>Find Love in the 6ix</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚇</Text>
            <Text style={styles.featureTitle}>TTC Integration</Text>
            <Text style={styles.featureDescription}>
              Match with people on your commute route
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏙️</Text>
            <Text style={styles.featureTitle}>Neighborhood Matching</Text>
            <Text style={styles.featureDescription}>
              Connect with locals in King West, Liberty Village & more
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🍁</Text>
            <Text style={styles.featureTitle}>Toronto Venues</Text>
            <Text style={styles.featureDescription}>
              Discover date spots from Distillery District to CN Tower
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>❄️</Text>
            <Text style={styles.featureTitle}>Seasonal Events</Text>
            <Text style={styles.featureDescription}>
              From Winterlicious to CNE - never miss a Toronto moment
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a24']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Join thousands of Torontonians finding meaningful connections
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    color: '#e8e8e8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  featureItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#e8e8e8',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedButton: {
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  disclaimer: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
  },
});

export default WelcomeScreen;