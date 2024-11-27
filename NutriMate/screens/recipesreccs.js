import React, { useState, useLayoutEffect, useRef, useContext } from 'react';
import { 
  TextInput, 
  View, 
  Alert, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator, 
  Image 
} from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for the robot icon

// Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = '#####################';
const genAI = new GoogleGenerativeAI(API_KEY);

// Import context
import { MealsContext } from '../context'; // Adjust the path if necessary

export default function RecipeReccs() {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { favorites, setFavorites } = useContext(MealsContext); // Access favorites from context

  // Handle sending the message
  const handleSend = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const chat = model.startChat();
      const result = await chat.sendMessage(query);
      const response = result.response;
      if (response) {
        const text = await response?.text();
        const newQuestion = { question: query, answer: text, id: new Date().getTime() }; // Added unique id for each message
        setMessages((prevMessages) => [...prevMessages, newQuestion]);
        scrollRef.current?.scrollToEnd({ animated: true });
      }
      setQuery('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setQuery('');
      Alert.alert('Error', err.message || err);
    }
  };

  // Add message to favorites
  const addToFavorites = (msg) => {
    setFavorites((prevFavorites) => {
      // Prevent adding duplicates to the favorites list
      if (!prevFavorites.find((fav) => fav.id === msg.id)) {
        return [...prevFavorites, msg];
      }
      return prevFavorites;
    });
    Alert.alert('Added to Favorites', 'This message has been added to your favorites!');
  };

  // Navigate back to home screen
  const goBackHomescreen = () => {
    navigator.navigate('home');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity onPress={goBackHomescreen}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <View style={styles.userinput}>
          <TextInput
            style={styles.textInput}
            placeholder="Chat with NutriMate"
            multiline={true}
            editable={loading ? false : true}
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
          {loading ? (
            <ActivityIndicator size={'small'} color={'#33CEFF'} style={styles.loadingIndicator} />
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Image style={styles.sendImg} source={require('../image.png')} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.container1}>
        {messages.length > 0 &&
          messages.map((msg) => (
            <View key={msg.id} style={styles.listWrapper}>
              <View style={styles.listQuestionStyle}>
                <Text style={styles.listTextStyle}>
                  <Ionicons name="robot" size={20} color="#3eb07e" /> {msg.question}
                </Text>
              </View>
              <View style={styles.listStyle}>
                <Text style={styles.listTextStyle}>{msg.answer}</Text>
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => addToFavorites(msg)}
                >
                  <Ionicons name="star-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    paddingTop:30
  },
  backButton: {
    color: '#3eb07e',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: { 
    marginTop: 15, 
    paddingHorizontal: 15,
  },
  userinput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 9,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#3eb07e', // Green send button
    borderRadius: 5,
    padding: 8,
  },
  sendImg: {
    width: 40,
    height: 40,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  container1: {
    paddingBottom: 20,
  },
  listWrapper: {
    marginTop: 10,
    marginBottom: 15,
  },
  listQuestionStyle: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3eb07e',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  listStyle: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 15,
    position: 'relative', // Added to make sure content doesn't overlap
  },
  listTextStyle: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensures the button stays on top
  },
});

