// basic imports
import {
  TextInput,
  View,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

//navigation
import Prefrences from './userPrefrences'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// Create the tab navigator
export default function RegistrationScreen() {
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const [currentStep, setCurrentStep] = useState(1)
  const [userInput, setUserInput] = useState({
    name: '',
    age: '',
    gender: '',
    bmi: '',
    veg: '',
    diet: '',
  });


  function userProfile(name, age, gender, bmi, veg, diet) {
    this.userName = name;
    this.userAge = age;
    this.userGender = gender;
    this.userBmi = bmi;
    this.userVeg=veg;
    this.userDiet = diet;
  }

  function userInputHandler(key, value) {
    setUserInput((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  const handleSubmit = () => {
    const { name, age, gender, bmi } = userInput;

    if (!name || !age || !gender || !bmi) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    setCurrentStep(2)
  }
   const handlePreferencesSubmit = ({ dietType, preferredDiet }) => {

    setUserInput((prevData) => ({
      ...prevData,
      veg: dietType,
      diet: preferredDiet,
    }));

    const newUserProfile = new userProfile(userInput);

    console.log('User Profile:', newUserProfile);
  };


  return (
    <SafeAreaView style={styles.containerofcontainer}>
    {currentStep ===1 && (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Profile</Text>
      <Text style={styles.subHeader}>
        Let{' '}
        <View style={{ color: '#3eb07e', fontWeight: 'bold' }}>NutriMate</View>{' '}
        calculate what your body needs.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userInput.name}
        onChangeText={(text) => userInputHandler('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={userInput.age}
        onChangeText={(text) => userInputHandler('age', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your gender"
        value={userInput.gender}
        onChangeText={(text) => userInputHandler('gender', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your BMI"
        keyboardType="numeric"
        value={userInput.bmi}
        onChangeText={(text) => userInputHandler('bmi', text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>)}

    {currentStep === 2 &&(
      <Prefrences onSubmit={handlePreferencesSubmit}/>
    )}

    </SafeAreaView>
  );
  }

const styles = StyleSheet.create({
  containerofcontainer: {
    flex: 1,
    backgroundColor: '#fafcfe',
    padding: 20,
  
  },

  container: {
    flex: 1,
    backgroundColor: '#fafcfe',
    padding: 20,
  },
  header: {
    color: '#3eb07e',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  subHeader: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3eb07e',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fafcfe',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
