import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Toronto-specific data
const TORONTO_VENUES = [
  { name: 'CN Tower', type: 'landmark', area: 'Downtown' },
  { name: 'Ripley\'s Aquarium', type: 'attraction', area: 'Downtown' },
  { name: 'Distillery District', type: 'historic', area: 'East End' },
  { name: 'Kensington Market', type: 'market', area: 'West End' },
  { name: 'High Park', type: 'park', area: 'West End' },
  { name: 'Toronto Islands', type: 'recreation', area: 'Harbourfront' },
  { name: 'Casa Loma', type: 'castle', area: 'Midtown' },
  { name: 'St. Lawrence Market', type: 'market', area: 'Downtown' },
];

const TTC_LINES = [
  { name: 'Line 1 (Yonge-University)', color: '#FFD320', stations: ['Finch', 'North York Centre', 'Sheppard-Yonge', 'Bloor-Yonge', 'Queen', 'Union', 'St. Andrew'] },
  { name: 'Line 2 (Bloor-Danforth)', color: '#00B04F', stations: ['Kipling', 'Islington', 'Jane', 'Runnymede', 'Dundas West', 'Lansdowne', 'Dufferin', 'Ossington', 'Christie', 'Bathurst', 'Spadina', 'St. George', 'Bay', 'Bloor-Yonge', 'Sherbourne', 'Castle Frank', 'Broadview', 'Chester', 'Pape', 'Donlands', 'Greenwood', 'Coxwell', 'Woodbine', 'Main Street', 'Victoria Park', 'Warden', 'Kennedy'] },
  { name: 'Line 4 (Sheppard)', color: '#B933AD', stations: ['Sheppard-Yonge', 'Bayview', 'Bessarion', 'Leslie', 'Don Mills'] },
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: Date;
  type: 'text' | 'venue' | 'ttc' | 'event';
  data?: any;
}

interface ChatScreenProps {
  route: {
    params: {
      matchId: string;
      matchName: string;
      matchPhoto?: string;
    };
  };
}

const ChatScreen: React.FC<ChatScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { matchId, matchName } = route.params as any;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey! I see we both love exploring Toronto! 🍁`,
      sender: 'match',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
    },
    {
      id: '2',
      text: `Hi! Yes, Toronto has so much to offer. What's your favorite neighborhood?`,
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Simulate typing indicator
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(typingTimer);
  }, [messages]);

  const sendMessage = (text: string, type: 'text' | 'venue' | 'ttc' | 'event' = 'text', data?: any) => {
    if (!text.trim() && type === 'text') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type,
      data,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setShowSuggestions(false);

    // Simulate response after a delay
    setTimeout(() => {
      simulateResponse(type, text);
    }, 1500);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const simulateResponse = (messageType: string, userMessage: string) => {
    let responseText = '';
    let responseType: 'text' | 'venue' | 'ttc' | 'event' = 'text';
    let responseData = null;

    switch (messageType) {
      case 'venue':
        responseText = `Great choice! I love that area too. Want to check it out together this weekend? 😊`;
        break;
      case 'ttc':
        responseText = `Perfect! We're on the same line. Makes meeting up so much easier! 🚇`;
        break;
      case 'event':
        responseText = `That sounds amazing! I'd love to go with you. Should we grab dinner before? 🍽️`;
        break;
      default:
        const responses = [
          `That's so cool! I totally agree 😄`,
          `Really? Tell me more about that!`,
          `I love your perspective on Toronto life! 🏙️`,
          `We should definitely explore that together sometime!`,
          `You seem to know all the best spots in the city! 🌟`,
        ];
        responseText = responses[Math.floor(Math.random() * responses.length)];
    }

    const response: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: 'match',
      timestamp: new Date(),
      type: responseType,
      data: responseData,
    };

    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const suggestVenue = (venue: typeof TORONTO_VENUES[0]) => {
    const text = `How about we check out ${venue.name} in ${venue.area}? It's a great ${venue.type}! 📍`;
    sendMessage(text, 'venue', venue);
  };

  const suggestTTCRoute = (line: typeof TTC_LINES[0]) => {
    const text = `I usually take the ${line.name}. Do you use that line too? 🚇`;
    sendMessage(text, 'ttc', line);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.matchMessage]}>
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.matchBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.matchText]}>
            {item.text}
          </Text>
          {item.type === 'venue' && item.data && (
            <View style={styles.venueCard}>
              <Text style={styles.venueTitle}>{item.data.name}</Text>
              <Text style={styles.venueDetails}>{item.data.type} • {item.data.area}</Text>
            </View>
          )}
          {item.type === 'ttc' && item.data && (
            <View style={[styles.ttcCard, { borderLeftColor: item.data.color }]}>
              <Text style={styles.ttcTitle}>{item.data.name}</Text>
              <Text style={styles.ttcStations}>
                {item.data.stations.slice(0, 3).join(' • ')}...
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  const renderSuggestions = () => {
    if (!showSuggestions) return null;

    return (
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Toronto Suggestions 🍁</Text>
        
        <View style={styles.suggestionSection}>
          <Text style={styles.sectionTitle}>📍 Venues</Text>
          <FlatList
            horizontal
            data={TORONTO_VENUES.slice(0, 4)}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionCard}
                onPress={() => suggestVenue(item)}
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
                <Text style={styles.suggestionSubtext}>{item.area}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.suggestionSection}>
          <Text style={styles.sectionTitle}>🚇 TTC Lines</Text>
          <FlatList
            horizontal
            data={TTC_LINES}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.suggestionCard, { borderLeftColor: item.color, borderLeftWidth: 4 }]}
                onPress={() => suggestTTCRoute(item)}
              >
                <Text style={styles.suggestionText}>{item.name.split(' ')[0]} {item.name.split(' ')[1]}</Text>
                <Text style={styles.suggestionSubtext}>{item.stations.length} stations</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.matchName}>{matchName}</Text>
          <Text style={styles.onlineStatus}>Online • Toronto, ON</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>{matchName} is typing...</Text>
            </View>
          </View>
        )}

        {/* Suggestions */}
        {renderSuggestions()}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.suggestionsButton}
            onPress={() => setShowSuggestions(!showSuggestions)}
          >
            <Text style={styles.suggestionsButtonText}>🍁</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity
            style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#111',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#ff6b6b',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  matchName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineStatus: {
    color: '#16537e',
    fontSize: 14,
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  matchMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#ff6b6b',
    borderBottomRightRadius: 4,
  },
  matchBubble: {
    backgroundColor: '#333',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  matchText: {
    color: '#fff',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 8,
  },
  venueCard: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  venueTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  venueDetails: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  ttcCard: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  ttcTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  ttcStations: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  typingText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
  suggestionsContainer: {
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 16,
  },
  suggestionsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  suggestionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#16537e',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  suggestionCard: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 120,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionSubtext: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  suggestionsButton: {
    padding: 12,
    marginRight: 8,
  },
  suggestionsButtonText: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  sendButtonActive: {
    backgroundColor: '#ff6b6b',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatScreen;