import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MealsProvider } from "./context.js";
import WelcomeScreen from "./screens/welcomescreen";
import RegistrationScreen from "./screens/registrationscreen";
import Homescreen from "./screens/homescreen";
import RecipeReccs from "./screens/recipesreccs";
import MealEnterMenu from "./screens/enterMeal";
import ProfileScreen from "./screens/profilescreen";
import MealsHistoryScreen from "./screens/mealshistory";
import FavouritesScreen from "./screens/favourites";
import { Ionicons } from "@expo/vector-icons";

// Create Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Button Component for the "+" Button
const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.customButton}>{children}</View>
    </TouchableOpacity>
  );
};

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Homescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="home-outline" size={size} color={"#3eb07e"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="mealenter"
        component={MealEnterMenu}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" size={30} color="#fff" />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Ionicons name="add" size={30} color="#fff" />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="recipes"
        component={RecipeReccs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="restaurant-outline" size={size} color={"#3eb07e"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 240,
        },
        headerShown: false, // Hide the header
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Meals History" component={MealsHistoryScreen} />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
    </Drawer.Navigator>
  );
}


// Main App
export default function App() {
  return (
    <MealsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MealsProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  customButtonContainer: {
    top: -30, // Floating effect
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#3CB371",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    top: "50%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

