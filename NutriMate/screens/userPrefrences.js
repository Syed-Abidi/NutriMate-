import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

export default function PreferencesScreen({onSubmit}) {
  const navigator = useNavigation();
  const [dietType, setDietType] = useState(''); // veg or non-veg
  const [preferredDiet, setPreferredDiet] = useState(''); // diet preference

  const handleSubmit = () => {
    if (!dietType || !preferredDiet) {
      Alert.alert('Error', 'Please select all options before proceeding.');
      return;
    }
    onSubmit({dietType, preferredDiet})
    navigator.navigate('home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Your Preferences</Text>

      {/* Diet Type Selection */}
      <Text style={styles.subHeader}>Are you vegetarian or non-vegetarian?</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, dietType === 'Vegetarian' && styles.selectedOption]}
          onPress={() => setDietType('Vegetarian')}
        >
          <Text style={styles.optionText}>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, dietType === 'Non-Vegetarian' && styles.selectedOption]}
          onPress={() => setDietType('Non-Vegetarian')}
        >
          <Text style={styles.optionText}>Both Veg & Non-Veg</Text>
        </TouchableOpacity>
      </View>

      {/* Preferred Diet Dropdown */}
      <Text style={styles.subHeader}>What is your preferred diet option?</Text>
      <RNPickerSelect
        onValueChange={(value) => setPreferredDiet(value)}
        items={[
          { label: 'Mediterranean', value: 'Mediterranean' },
          { label: 'Indian', value: 'Indian' },
          { label: 'Chinese', value: 'Chinese' },
        ]}
        placeholder={{ label: 'Select a diet', value: null }}
        style={{
          inputIOS: styles.dropdown,
          inputAndroid: styles.dropdown,
        }}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    color: '#3eb07e',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    width: '48%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  selectedOption: {
    borderColor: '#3eb07e',
    backgroundColor: '#e6f4ee',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    
  },
  dropdown: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 40,
    backgroundColor: '#3eb07e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

