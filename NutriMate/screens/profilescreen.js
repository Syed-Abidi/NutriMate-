import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MealsContext } from '../context';

export default function ProfileScreen() {
  const { userDetails, setUserDetails } = useContext(MealsContext); // Access context
  const [editableDetails, setEditableDetails] = useState(userDetails); // Editable state

  const handleSave = () => {
    setUserDetails(editableDetails); // Update context with new details
    alert('Profile updated successfully!');
  };

  const handleInputChange = (key, value) => {
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editableDetails.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={editableDetails.age.toString()}
        onChangeText={(text) => handleInputChange('age', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={editableDetails.gender}
        onChangeText={(text) => handleInputChange('gender', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="BMI"
        keyboardType="numeric"
        value={editableDetails.bmi.toString()}
        onChangeText={(text) => handleInputChange('bmi', text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafcfe',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3eb07e',
    textAlign: 'center',
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
  saveButton: {
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
