// Basic Imports
import {
  TextInput,
  View,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  SafeAreaView
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Mealcards from '../components/mealhistorycards'
// Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function MealsHistoryScreen(){
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);


  return(

    <SafeAreaView style={styles.container}>
     <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => navigator.openDrawer()} // Opens the navigation drawer
      >
        <Ionicons name="menu-outline" size={30} color="#3CB371" />
      </TouchableOpacity>
    <ScrollView>
     <View style={styles.cardContainer}>
          <Mealcards/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   scrollContainer: {
    paddingVertical: 0, // Add some spacing inside ScrollView
  },
  cardContainer: {
    marginBottom: 10, // Space between Nutritional Card and Meal Cards
  },
  container:{flex:1,
  backgroundColor:"#f9f9f9",
  marginTop:30
  },

    drawerButton: {
    //position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: '#f9f9f9', // Optional: Add a background
    borderRadius: 15,
    padding: 5,
    width:50
  },
})