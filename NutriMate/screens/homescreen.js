// Basic Imports
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import Nutritionalcard from '../components/nutritionalcard';
import Mealcards from '../components/mealcards';

// Icon
import { Ionicons } from '@expo/vector-icons';

export default function Homescreen() {
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Button */}
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => navigator.openDrawer()} // Opens the navigation drawer
      >
        <Ionicons name="menu-outline" size={30} color="#3CB371" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Nutritional Card */}
        <View style={styles.cardContainer}>
          <Nutritionalcard />
        </View>

        {/* Meal Cards */}
        <View style={styles.cardContainer}>
          <Mealcards />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow screen to take the full height
    backgroundColor: '#f9f9f9',
    paddingTop:30
  },
  scrollContainer: {
    paddingVertical: 0, // Add some spacing inside ScrollView
  },
  cardContainer: {
    marginBottom: 10, // Space between Nutritional Card and Meal Cards
  },
  drawerButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#f9f9f9', // Optional: Add a background
    borderRadius: 15,
    padding: 5,
  },
});
