import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { MealsContext } from '../context'; // Access the shared meal data

export default function Mealcards() {
  const { allMeals } = useContext(MealsContext); // Get all meals from context
  const [selectedMeal, setSelectedMeal] = useState(null); // Store selected meal for modal
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility

  // Function to handle card click
  const openModal = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedMeal(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const totalCalories = item.items.reduce((sum, i) => sum + i.calories, 0);
          const totalCarbs = item.items.reduce((sum, i) => sum + i.carbohydrates_total_g, 0);
          const totalProtein = item.items.reduce((sum, i) => sum + i.protein_g, 0);
          const totalFat = item.items.reduce((sum, i) => sum + i.fat_total_g, 0);

          return (
            <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
              <Text style={styles.cardTitle}>{item.mealName}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>Calories: {totalCalories.toFixed(0)} kcal</Text>
                <Text style={styles.cardText}>Carbs: {totalCarbs.toFixed(1)} g</Text>
                <Text style={styles.cardText}>Protein: {totalProtein.toFixed(1)} g</Text>
                <Text style={styles.cardText}>Fat: {totalFat.toFixed(1)} g</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Modal for Detailed Information */}
      {selectedMeal && (
        <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={closeModal}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMeal.mealName}</Text>
              <ScrollView>
                {selectedMeal.items.map((item, index) => (
                  <View key={index} style={styles.modalItem}>
                    <Text style={styles.modalItemText}>Name: {item.name}</Text>
                    <Text style={styles.modalItemText}>Calories: {item.calories} kcal</Text>
                    <Text style={styles.modalItemText}>Carbs: {item.carbohydrates_total_g} g</Text>
                    <Text style={styles.modalItemText}>Protein: {item.protein_g} g</Text>
                    <Text style={styles.modalItemText}>Fat: {item.fat_total_g} g</Text>
                    <Text style={styles.modalItemText}>Iron: {item.iron_mg || 'N/A'} mg</Text>
                    <Text style={styles.modalItemText}>Magnesium: {item.magnesium_mg || 'N/A'} mg</Text>
                    <Text style={styles.modalItemText}>Sodium: {item.sodium_mg || 'N/A'} mg</Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafcfe',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e6f4ee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3eb07e',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    marginBottom: 10,
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#3eb07e',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
