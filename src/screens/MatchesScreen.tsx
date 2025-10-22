import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mock data for matches with Toronto-specific information
interface Match {
  id: string;
  name: string;
  age: number;
  photo: string;
  neighborhood: string;
  ttcLine: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  isOnline: boolean;
  distance: number;
  interests: string[];
  isNewMatch: boolean;
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    neighborhood: 'King West',
    ttcLine: 'Line 1',
    lastMessage: 'That sounds like a great plan! 😊',
    lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
    isOnline: true,
    distance: 2.1,
    interests: ['Coffee', 'Art', 'TTC'],
    isNewMatch: false,
  },
  {
    id: '2',
    name: 'Emma',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    neighborhood: 'Liberty Village',
    ttcLine: 'Line 2',
    lastMessage: 'I love that area too!',
    lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
    isOnline: false,
    distance: 1.8,
    interests: ['Yoga', 'Brunch', 'High Park'],
    isNewMatch: true,
  },
  {
    id: '3',
    name: 'Jessica',
    age: 30,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    neighborhood: 'Distillery District',
    ttcLine: 'Streetcar',
    lastMessage: 'The CN Tower view was amazing!',
    lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
    isOnline: true,
    distance: 3.2,
    interests: ['Photography', 'Wine', 'History'],
    isNewMatch: false,
  },
  {
    id: '4',
    name: 'Olivia',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    neighborhood: 'Kensington Market',
    ttcLine: 'Line 2',
    isOnline: false,
    distance: 2.7,
    interests: ['Music', 'Food', 'Markets'],
    isNewMatch: true,
  },
  {
    id: '5',
    name: 'Madison',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    neighborhood: 'Yorkville',
    ttcLine: 'Line 1',
    lastMessage: 'Let\'s meet at Union Station!',
    lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
    isOnline: true,
    distance: 1.5,
    interests: ['Shopping', 'Fine Dining', 'Museums'],
    isNewMatch: false,
  },
  {
    id: '6',
    name: 'Chloe',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    neighborhood: 'The Beaches',
    ttcLine: 'Streetcar',
    isOnline: false,
    distance: 8.3,
    interests: ['Beach', 'Cycling', 'Sunset'],
    isNewMatch: true,
  },
];

const TORONTO_NEIGHBORHOODS = [
  'All Areas',
  'Downtown',
  'King West',
  'Liberty Village',
  'Distillery District',
  'Kensington Market',
  'Yorkville',
  'The Beaches',
  'Leslieville',
  'Junction Triangle',
];

const MatchesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Areas');

  const filterOptions = ['All', 'New Matches', 'Recent Chats', 'Online Now'];

  useEffect(() => {
    filterMatches();
  }, [searchQuery, selectedFilter, selectedNeighborhood]);

  const filterMatches = () => {
    let filtered = MOCK_MATCHES;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(match =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    switch (selectedFilter) {
      case 'New Matches':
        filtered = filtered.filter(match => match.isNewMatch);
        break;
      case 'Recent Chats':
        filtered = filtered.filter(match => match.lastMessage);
        break;
      case 'Online Now':
        filtered = filtered.filter(match => match.isOnline);
        break;
    }

    // Neighborhood filter
    if (selectedNeighborhood !== 'All Areas') {
      filtered = filtered.filter(match => match.neighborhood === selectedNeighborhood);
    }

    // Sort by recent activity
    filtered.sort((a, b) => {
      if (a.lastMessageTime && b.lastMessageTime) {
        return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
      }
      if (a.lastMessageTime) return -1;
      if (b.lastMessageTime) return 1;
      return 0;
    });

    setMatches(filtered);
  };

  const formatLastMessageTime = (time?: Date) => {
    if (!time) return '';
    
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const navigateToChat = (match: Match) => {
    navigation.navigate('Chat' as never, {
      matchId: match.id,
      matchName: match.name,
      matchPhoto: match.photo,
    } as never);
  };

  const renderMatch = ({ item }: { item: Match }) => {
    return (
      <TouchableOpacity
        style={styles.matchCard}
        onPress={() => navigateToChat(item)}
        activeOpacity={0.7}
      >
        <View style={styles.matchImageContainer}>
          <Image source={{ uri: item.photo }} style={styles.matchImage} />
          {item.isOnline && <View style={styles.onlineIndicator} />}
          {item.isNewMatch && (
            <View style={styles.newMatchBadge}>
              <Text style={styles.newMatchText}>NEW</Text>
            </View>
          )}
        </View>
        
        <View style={styles.matchInfo}>
          <View style={styles.matchHeader}>
            <Text style={styles.matchName}>{item.name}, {item.age}</Text>
            {item.lastMessageTime && (
              <Text style={styles.messageTime}>
                {formatLastMessageTime(item.lastMessageTime)}
              </Text>
            )}
          </View>
          
          <View style={styles.locationInfo}>
            <Text style={styles.neighborhood}>📍 {item.neighborhood}</Text>
            <Text style={styles.distance}>{item.distance}km away</Text>
          </View>
          
          <Text style={styles.ttcLine}>🚇 {item.ttcLine}</Text>
          
          {item.lastMessage ? (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          ) : (
            <View style={styles.interestsContainer}>
              {item.interests.slice(0, 2).map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterChip = (filter: string) => {
    const isSelected = selectedFilter === filter;
    return (
      <TouchableOpacity
        key={filter}
        style={[styles.filterChip, isSelected && styles.filterChipSelected]}
        onPress={() => setSelectedFilter(filter)}
      >
        <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
          {filter}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNeighborhoodChip = (neighborhood: string) => {
    const isSelected = selectedNeighborhood === neighborhood;
    return (
      <TouchableOpacity
        key={neighborhood}
        style={[styles.neighborhoodChip, isSelected && styles.neighborhoodChipSelected]}
        onPress={() => setSelectedNeighborhood(neighborhood)}
      >
        <Text style={[styles.neighborhoodChipText, isSelected && styles.neighborhoodChipTextSelected]}>
          {neighborhood}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>{matches.length} connections in Toronto 🍁</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search matches or neighborhoods..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterOptions.map(renderFilterChip)}
      </ScrollView>

      {/* Neighborhood Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.neighborhoodsContainer}
        contentContainerStyle={styles.neighborhoodsContent}
      >
        {TORONTO_NEIGHBORHOODS.map(renderNeighborhoodChip)}
      </ScrollView>

      {/* Matches List */}
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={renderMatch}
          style={styles.matchesList}
          contentContainerStyle={styles.matchesContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No matches found</Text>
          <Text style={styles.emptyStateSubtitle}>
            Try adjusting your filters or explore more profiles in Toronto!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Text style={styles.exploreButtonText}>Explore Profiles</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#16537e',
    fontSize: 16,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipSelected: {
    backgroundColor: '#ff6b6b',
  },
  filterChipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  neighborhoodsContainer: {
    paddingVertical: 8,
  },
  neighborhoodsContent: {
    paddingHorizontal: 20,
  },
  neighborhoodChip: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  neighborhoodChipSelected: {
    backgroundColor: '#16537e',
    borderColor: '#16537e',
  },
  neighborhoodChipText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  neighborhoodChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  matchesList: {
    flex: 1,
  },
  matchesContent: {
    paddingVertical: 16,
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  matchImageContainer: {
    position: 'relative',
  },
  matchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#111',
  },
  newMatchBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newMatchText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  matchInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  messageTime: {
    color: '#666',
    fontSize: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  neighborhood: {
    color: '#16537e',
    fontSize: 14,
    fontWeight: '500',
  },
  distance: {
    color: '#999',
    fontSize: 12,
  },
  ttcLine: {
    color: '#ee5a24',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 2,
  },
  lastMessage: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  interestTag: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  interestText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateSubtitle: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MatchesScreen;