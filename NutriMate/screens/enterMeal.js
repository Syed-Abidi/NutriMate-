import React, { useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  SafeAreaView

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For the arrow icon
import { MealsContext } from '../context'; // Import the context

export default function Homescreen() {
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const [nutritionData, setNutritionData] = useState(null); // Current meal data
  const [meal, setMeal] = useState(''); // Current meal input
  const [expandedIndex, setExpandedIndex] = useState(null); // For toggling details
  const { allMeals, setAllMeals } = useContext(MealsContext); // Array to store all meals

  const fetchNutritionData = async () => {
    if (!meal.trim()) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }

    const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(meal)}`;
    const apiKey = 'QFgS0MukzOiEyPVCN/2UKw==Y6qosNFC5umC29WO';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.items && result.items.length > 0) {
        const mealData = { mealName: meal, items: result.items };
        setAllMeals((prevMeals) => [...prevMeals, mealData]); // Save the meal in the array
        setNutritionData(mealData.items); // Update current meal display
        setMeal(''); // Clear input
        setExpandedIndex(null); // Reset expanded state
      } else {
        Alert.alert('No data found', 'The API did not return any results for your query.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error fetching data:', error);
    }
  };

  const toggleDetails = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const goBackHomescreen=()=>{
    navigator.navigate('home')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containertwo}>    
        <TouchableOpacity onPress={goBackHomescreen}><Text style={{color:'#3eb07e', padding:10, paddingTop:-5, fontSize:16,marginBottom:10 }}>Back</Text></TouchableOpacity>
      {/* Input Section */}
      <Text style={styles.header}>Enter the name of the meal you ate</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., chicken sandwich, 2 apples"
        value={meal}
        onChangeText={(text) => setMeal(text)}
      />
      <TouchableOpacity style={styles.button} onPress={fetchNutritionData}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <ScrollView style={styles.results}>
        {/* Display Current Meal */}
        {nutritionData && (
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryText}>Meal: {nutritionData[0]?.name || 'N/A'}</Text>
              <Text style={styles.summaryText}>
                Total Calories: {nutritionData.reduce((sum, item) => sum + item.calories, 0)} cal
              </Text>
              <Text style={styles.summaryText}>
                Total Carbs: {nutritionData.reduce((sum, item) => sum + item.carbohydrates_total_g, 0).toFixed(2)} g
              </Text>
              <Text style={styles.summaryText}>
                Total Protein: {nutritionData.reduce((sum, item) => sum + item.protein_g, 0).toFixed(2)} g
              </Text>
            </View>

            {nutritionData.map((item, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleDetails(index)}>
                    <MaterialIcons
                      name={expandedIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {expandedIndex === index && (
                  <View style={styles.details}>
                    <Text style={styles.detailText}>Calories: {item.calories} cal</Text>
                    <Text style={styles.detailText}>Carbs: {item.carbohydrates_total_g} g</Text>
                    <Text style={styles.detailText}>Protein: {item.protein_g} g</Text>
                    <Text style={styles.detailText}>Fat: {item.fat_total_g} g</Text>
                    <Text style={styles.detailText}>Iron: {item.iron_mg || 'N/A'} mg</Text>
                    <Text style={styles.detailText}>Magnesium: {item.magnesium_mg || 'N/A'} mg</Text>
                    <Text style={styles.detailText}>Sodium: {item.sodium_mg || 'N/A'} mg</Text>
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* Display All Meals */}
        {allMeals.length > 0 && (
          <View style={styles.allMeals}>
            <Text style={styles.allMealsHeader}>All Meals:</Text>
            {allMeals.map((meal, index) => (
              <View key={index} style={styles.allMealsItem}>
                <Text style={styles.allMealsText}>Meal: {meal.mealName}</Text>
                <Text style={styles.allMealsText}>
                  Total Calories: {meal.items.reduce((sum, item) => sum + item.calories, 0)} cal
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafcfe',
  },
  containertwo:{
    padding:10
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:"center"
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    alignSelf:'center'
  },
  button: {
    backgroundColor: '#3eb07e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:"80%",
    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  results: {
    marginTop: 20,
  },
  summary: {
    padding: 15,
    backgroundColor: '#e6f4ee',
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3eb07e',
    marginBottom: 5,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
  allMeals: {
    marginTop: 30,
  },
  allMealsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  allMealsItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e6f4ee',
    borderRadius: 5,
  },
  allMealsText: {
    fontSize: 16,
  },
});
