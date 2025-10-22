import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Toronto-specific data
const TORONTO_NEIGHBORHOODS = [
  'Downtown', 'King West', 'Liberty Village', 'Distillery District',
  'Kensington Market', 'Yorkville', 'The Beaches', 'Leslieville',
  'Junction Triangle', 'Corktown', 'Entertainment District', 'Financial District',
  'Queen West', 'Ossington', 'Little Italy', 'Chinatown',
];

const TTC_LINES = [
  'Line 1 (Yonge-University)', 'Line 2 (Bloor-Danforth)', 
  'Line 4 (Sheppard)', 'Streetcar Routes', 'Bus Routes',
];

const TORONTO_INTERESTS = [
  'CN Tower', 'ROM', 'AGO', 'Harbourfront', 'High Park', 'Toronto Islands',
  'Casa Loma', 'St. Lawrence Market', 'Distillery District', 'Kensington Market',
  'TTC', 'Biking', 'Skating', 'Blue Jays', 'Leafs', 'Raptors', 'TFC',
  'Winterlicious', 'Summerlicious', 'CNE', 'TIFF', 'Nuit Blanche',
  'Coffee Culture', 'Craft Beer', 'Poutine', 'Tim Hortons', 'Maple Syrup',
  'Hockey', 'Curling', 'Ice Skating', 'Skiing', 'Snowboarding',
];

interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  neighborhood: string;
  preferredNeighborhoods: string[];
  ttcLines: string[];
  interests: string[];
  jobTitle: string;
  company: string;
  education: string;
  height: string;
  lookingFor: string;
  ageRange: { min: number; max: number };
  maxDistance: number;
  showAge: boolean;
  showDistance: boolean;
  discoverable: boolean;
  notifications: {
    matches: boolean;
    messages: boolean;
    likes: boolean;
  };
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user123',
    name: 'Alex',
    age: 28,
    bio: 'Toronto native who loves exploring the city! Always up for trying new restaurants in King West or catching a Jays game. Let\'s discover the 6ix together! 🍁',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    ],
    neighborhood: 'King West',
    preferredNeighborhoods: ['King West', 'Liberty Village', 'Downtown'],
    ttcLines: ['Line 1 (Yonge-University)', 'Line 2 (Bloor-Danforth)'],
    interests: ['CN Tower', 'Blue Jays', 'Coffee Culture', 'TTC', 'High Park', 'Craft Beer'],
    jobTitle: 'Software Developer',
    company: 'Tech Startup',
    education: 'University of Toronto',
    height: '5\'10"',
    lookingFor: 'Long-term relationship',
    ageRange: { min: 25, max: 35 },
    maxDistance: 10,
    showAge: true,
    showDistance: true,
    discoverable: true,
    notifications: {
      matches: true,
      messages: true,
      likes: false,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Your profile has been updated!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = editedProfile.interests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    setEditedProfile({ ...editedProfile, interests: updatedInterests });
  };

  const toggleNeighborhood = (neighborhood: string) => {
    const current = editedProfile.preferredNeighborhoods;
    const updated = current.includes(neighborhood)
      ? current.filter(n => n !== neighborhood)
      : [...current, neighborhood];
    
    setEditedProfile({ ...editedProfile, preferredNeighborhoods: updated });
  };

  const toggleTTCLine = (line: string) => {
    const current = editedProfile.ttcLines;
    const updated = current.includes(line)
      ? current.filter(l => l !== line)
      : [...current, line];
    
    setEditedProfile({ ...editedProfile, ttcLines: updated });
  };

  const renderPhotos = () => {
    const photos = isEditing ? editedProfile.photos : profile.photos;
    
    return (
      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              {isEditing && (
                <TouchableOpacity style={styles.removePhotoButton}>
                  <Text style={styles.removePhotoText}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {isEditing && photos.length < 6 && (
            <TouchableOpacity style={styles.addPhotoButton}>
              <Text style={styles.addPhotoText}>+</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  };

  const renderInterests = () => {
    const interests = isEditing ? editedProfile.interests : profile.interests;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toronto Interests 🍁</Text>
        <View style={styles.tagsContainer}>
          {(isEditing ? TORONTO_INTERESTS : interests).map((interest, index) => {
            const isSelected = interests.includes(interest);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  isSelected && styles.tagSelected,
                  !isEditing && !isSelected && { display: 'none' },
                ]}
                onPress={isEditing ? () => toggleInterest(interest) : undefined}
                disabled={!isEditing}
              >
                <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderNeighborhoods = () => {
    const neighborhoods = isEditing ? editedProfile.preferredNeighborhoods : profile.preferredNeighborhoods;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Neighborhoods 🏙️</Text>
        <View style={styles.tagsContainer}>
          {(isEditing ? TORONTO_NEIGHBORHOODS : neighborhoods).map((neighborhood, index) => {
            const isSelected = neighborhoods.includes(neighborhood);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  isSelected && styles.tagSelected,
                  !isEditing && !isSelected && { display: 'none' },
                ]}
                onPress={isEditing ? () => toggleNeighborhood(neighborhood) : undefined}
                disabled={!isEditing}
              >
                <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                  {neighborhood}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTTCLines = () => {
    const lines = isEditing ? editedProfile.ttcLines : profile.ttcLines;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TTC Lines 🚇</Text>
        <View style={styles.tagsContainer}>
          {(isEditing ? TTC_LINES : lines).map((line, index) => {
            const isSelected = lines.includes(line);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  isSelected && styles.tagSelected,
                  !isEditing && !isSelected && { display: 'none' },
                ]}
                onPress={isEditing ? () => toggleTTCLine(line) : undefined}
                disabled={!isEditing}
              >
                <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                  {line}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.editButton}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photos */}
        {renderPhotos()}

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                placeholder="Your name"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{currentProfile.name}, {currentProfile.age}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={editedProfile.bio}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, bio: text })}
                placeholder="Tell us about yourself..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.value}>{currentProfile.bio}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Neighborhood</Text>
            <Text style={styles.value}>📍 {currentProfile.neighborhood}</Text>
          </View>
        </View>

        {/* Work & Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work & Education</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedProfile.jobTitle}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, jobTitle: text })}
                placeholder="Your job title"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{currentProfile.jobTitle}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedProfile.company}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, company: text })}
                placeholder="Your company"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{currentProfile.company}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Education</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedProfile.education}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, education: text })}
                placeholder="Your education"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{currentProfile.education}</Text>
            )}
          </View>
        </View>

        {/* Toronto Preferences */}
        {renderNeighborhoods()}
        {renderTTCLines()}
        {renderInterests()}

        {/* Dating Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dating Preferences</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Looking For</Text>
            <Text style={styles.value}>{currentProfile.lookingFor}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age Range</Text>
            <Text style={styles.value}>{currentProfile.ageRange.min} - {currentProfile.ageRange.max} years</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maximum Distance</Text>
            <Text style={styles.value}>{currentProfile.maxDistance} km</Text>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show my age</Text>
            <Switch
              value={currentProfile.showAge}
              onValueChange={(value) => 
                isEditing && setEditedProfile({ ...editedProfile, showAge: value })
              }
              trackColor={{ false: '#333', true: '#ff6b6b' }}
              thumbColor={currentProfile.showAge ? '#fff' : '#666'}
              disabled={!isEditing}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show distance</Text>
            <Switch
              value={currentProfile.showDistance}
              onValueChange={(value) => 
                isEditing && setEditedProfile({ ...editedProfile, showDistance: value })
              }
              trackColor={{ false: '#333', true: '#ff6b6b' }}
              thumbColor={currentProfile.showDistance ? '#fff' : '#666'}
              disabled={!isEditing}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Make me discoverable</Text>
            <Switch
              value={currentProfile.discoverable}
              onValueChange={(value) => 
                isEditing && setEditedProfile({ ...editedProfile, discoverable: value })
              }
              trackColor={{ false: '#333', true: '#ff6b6b' }}
              thumbColor={currentProfile.discoverable ? '#fff' : '#666'}
              disabled={!isEditing}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    color: '#ff6b6b',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  editButton: {
    color: '#16537e',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  photosContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  photoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  photo: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#444',
    borderStyle: 'dashed',
  },
  addPhotoText: {
    color: '#666',
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#16537e',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  value: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  tagSelected: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  tagTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ProfileScreen;