import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  useColorScheme,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

interface UserProfile {
  id: string;
  name: string;
  age: number;
  neighborhood: string;
  ttcRoute: string;
  bio: string;
  photos: string[];
  interests: string[];
  distance: number;
}

// Mock data for Toronto users
const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    neighborhood: 'King West',
    ttcRoute: 'Line 1 (Yonge-University)',
    bio: 'Love exploring Toronto\'s food scene! Always down for a walk through High Park or checking out the latest exhibit at the ROM.',
    photos: ['https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Sarah'],
    interests: ['Food', 'Museums', 'Hiking'],
    distance: 2.3,
  },
  {
    id: '2',
    name: 'Michael',
    age: 32,
    neighborhood: 'Liberty Village',
    ttcRoute: 'Line 2 (Bloor-Danforth)',
    bio: 'Jays fan, craft beer enthusiast, and weekend warrior at the Harbourfront. Looking for someone to explore the city with!',
    photos: ['https://via.placeholder.com/400x600/4ecdc4/ffffff?text=Michael'],
    interests: ['Sports', 'Beer', 'Waterfront'],
    distance: 1.8,
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    neighborhood: 'Distillery District',
    ttcRoute: 'Streetcar 504 King',
    bio: 'Artist and coffee lover. You\'ll find me at local galleries or cozy cafes in Kensington Market. Let\'s grab a latte!',
    photos: ['https://via.placeholder.com/400x600/45b7d1/ffffff?text=Emma'],
    interests: ['Art', 'Coffee', 'Markets'],
    distance: 3.1,
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState<UserProfile[]>(mockProfiles);
  const [isLoading, setIsLoading] = useState(false);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipeLeft = () => {
    // Pass/Reject
    nextProfile();
  };

  const handleSwipeRight = () => {
    // Like
    Alert.alert(
      'It\'s a Match! 🎉',
      `You and ${currentProfile.name} both like each other! Start chatting now.`,
      [
        { text: 'Keep Swiping', onPress: nextProfile },
        { text: 'Start Chat', onPress: () => navigation.navigate('Chat') },
      ]
    );
  };

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // Load more profiles
      Alert.alert('No More Profiles', 'Check back later for more potential matches!');
    }
  };

  const renderProfileCard = () => {
    if (!currentProfile) {
      return (
        <View style={[styles.card, styles.emptyCard]}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#fff' : '#333' }]}>
            No more profiles to show!
          </Text>
          <Text style={[styles.emptySubtext, { color: isDarkMode ? '#ccc' : '#666' }]}>
            Check back later for more matches
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: currentProfile.photos[0] }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardOverlay}
        >
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>
                {currentProfile.name}, {currentProfile.age}
              </Text>
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>{currentProfile.distance} km</Text>
              </View>
            </View>
            
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{currentProfile.neighborhood}</Text>
            </View>
            
            <View style={styles.ttcRow}>
              <Text style={styles.ttcIcon}>🚇</Text>
              <Text style={styles.ttcText}>{currentProfile.ttcRoute}</Text>
            </View>
            
            <Text style={styles.profileBio}>{currentProfile.bio}</Text>
            
            <View style={styles.interestsContainer}>
              {currentProfile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
          Discover
        </Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        {renderProfileCard()}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={handleSwipeLeft}
        >
          <Text style={styles.actionIcon}>❌</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={() => Alert.alert('Super Like!', 'You super liked this person!')}
        >
          <Text style={styles.actionIcon}>⭐</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleSwipeRight}
        >
          <Text style={styles.actionIcon}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Hint */}
      <View style={styles.bottomHint}>
        <Text style={[styles.hintText, { color: isDarkMode ? '#888' : '#999' }]}>
          Swipe or tap buttons to interact
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    width: width - 40,
    height: height * 0.65,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  profileInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  distanceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  ttcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ttcIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  ttcText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  profileBio: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.9,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  interestText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  passButton: {
    backgroundColor: '#ff4458',
  },
  superLikeButton: {
    backgroundColor: '#42cff4',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  likeButton: {
    backgroundColor: '#42e695',
  },
  actionIcon: {
    fontSize: 24,
  },
  bottomHint: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  hintText: {
    fontSize: 12,
  },
});

export default HomeScreen;