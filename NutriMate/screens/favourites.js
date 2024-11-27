import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,SafeAreaView } from "react-native";
import { MealsContext } from "../context"; // Import context
import { Ionicons } from "@expo/vector-icons"; // For star icons
import { useNavigation } from '@react-navigation/native';
const FavoritesScreen = ({ navigation }) => {
  const { favorites, setFavorites } = useContext(MealsContext); // Access the favorites from context
 const navigator = useNavigation();
  // Function to handle removing a favorite
  const removeFromFavorites = (msg) => {
    Alert.alert("Remove from Favorites?", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          // Log favorites before filtering to check current state
          console.log("Before removal: ", favorites);

          // Remove the item from the favorites list by filtering out the current item
          setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((favorite) => favorite.id !== msg.id);
            console.log("After removal: ", updatedFavorites); // Log updated favorites after removal
            return updatedFavorites;
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView
     style={styles.container}>
      <View style={{padding:10, paddingLeft:20}}>
     <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => navigator.openDrawer()} // Opens the navigation drawer
      >
        <Ionicons name="menu-outline" size={30} color="#3CB371" />
      </TouchableOpacity>
      </View>
      {/* Display each favorited message */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {favorites.length > 0 ? (
          favorites.map((msg, index) => (
            <View key={msg.id || index} style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageText}>{msg.question}</Text>
              </View>
              <View style={styles.messageBody}>
                <Text style={styles.messageText}>{msg.answer}</Text>
              </View>
              {/* Star icon to show it's a favorite */}
              <TouchableOpacity onPress={() => removeFromFavorites(msg)}>
                <Ionicons name="star" size={30} color="#ffcc00" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>No favorites yet!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    paddingTop:50
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3eb07e",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  messageHeader: {
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageBody: {
    marginBottom: 10,
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
});

export default FavoritesScreen;

