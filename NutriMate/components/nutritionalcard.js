import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MealsContext } from "../context"; // Import the context

export default function NutritionalCard() {
  // Access the allMeals data and user details from the context
  const { allMeals, userDetails } = useContext(MealsContext);

  const [rda, setRDA] = useState({ calories: 2000, carbs: 300, protein: 50, fat: 70 }); // Default RDAs

  // Calculate the total nutrients consumed from allMeals
  const totals = allMeals.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.calories += item.calories || 0;
        acc.carbs += item.carbohydrates_total_g || 0;
        acc.protein += item.protein_g || 0;
        acc.fat += item.fat_total_g || 0;
      });
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  // Calculate the percentage of RDA consumed for each macro
  const calculatePercentage = (intake, rdaValue) =>
    rdaValue > 0 ? ((intake / rdaValue) * 100).toFixed(1) : "N/A";

  return (
    <View style={styles.container}>
      {/* Display Total Calories */}
      <View style={styles.caloriesContainer}>
        <Text style={styles.calories}>{totals.calories.toFixed(0)} kcal</Text>
        <Text style={styles.label}>Calories</Text>
        <Text style={styles.rdaLabel}>
          {calculatePercentage(totals.calories, rda.calories)}% RDA
        </Text>
      </View>

      {/* Display Nutrients and RDA Percentage */}
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{totals.carbs.toFixed(2)} g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.rdaLabel}>
            {calculatePercentage(totals.carbs, rda.carbs)}% RDA
          </Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{totals.protein.toFixed(2)} g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.rdaLabel}>
            {calculatePercentage(totals.protein, rda.protein)}% RDA
          </Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{totals.fat.toFixed(2)} g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
          <Text style={styles.rdaLabel}>
            {calculatePercentage(totals.fat, rda.fat)}% RDA
          </Text>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafcfe",
    borderRadius: 40,
  },
  caloriesContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  calories: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3eb07e",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3eb07e",
  },
  macroLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  rdaLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
});


