import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import usersData from '../Data/users.json'; // Importing the JSON file
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const navigation = useNavigation();
  
    const handleSignIn = async () => {
      try {
        // Retrieve the stored user data from AsyncStorage
        const storedUsersData = await AsyncStorage.getItem('usersData');
        const usersData = JSON.parse(storedUsersData);

        // Check if the email and password match any user in the retrieved data
        const user = usersData.find(user => user.email === email && user.password === password);

        if (user) {
          // Authentication successful
          console.log('Authentication successful');
          // Navigate to the home screen or perform any other actions
          navigation.navigate('Messaging');
        } else {
          // Authentication failed
          console.log('Authentication failed');
          Alert.alert('Authentication failed', 'Incorrect email or password');
        }
      } catch (error) {
        console.log('Error retrieving user data from AsyncStorage:', error);
      }
    };
  
    const handleCreateAccount = () => {
      // Implement logic for creating an account
      console.log('Create Account');
      navigation.navigate('SignUp')
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text> </Text>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
});

export default SignInScreen;
//q: im getting an error that ys compiling js failed: 162293:20 invalid exorwssion buffer size 7500094 starts with 766172205f5f42554e444c455f535441 and has protetion mode r--p
//a: This error is a known issue with the Metro bundler. It is caused by a large file in the project. To resolve this issue, you can try the following:
//  1. Clear the Metro cache by running the following command in the terminal:
//     npx react-native start --reset-cache
//  2. If the issue persists, try removing the node_modules folder and reinstalling the dependencies:
//     rm -rf node_modules
//     npm install
//  3. If the issue still persists, try removing the build folders and files:
//     rm -rf android/build
//     rm -rf ios/build

// Path: app/_layout.js
// Compare this snippet from app/_layout.js:
// import { Stack } from 'expo-router';
//