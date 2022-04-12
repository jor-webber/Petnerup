import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/colors';
import { auth, firestore } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection } from 'firebase/firestore';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPWError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  // Method to validate email while user is typing
  // applied to only confirm password input
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (text.length === 0) {
      setEmailError('');
    }
    if (reg.test(text) === false) {
      setEmail(text);
      setEmailError('Enter a valid email');
      return false;
    } else {
      setEmail(text);
      setEmailError('');
    }
  };

  // Method to validate all fields on the press of submit button
  const validateFields = () => {
    if (email.length < 1) {
      setEmailError('Email is required');
      return false;
    }
    if (firstName.length < 1) {
      setFirstNameError('First name is required');
      return false;
    }
    if (lastName.length < 1) {
      setLastNameError('Last name is required');
      return false;
    }
    if (password.length < 8) {
      setPWError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPWError('Passwords do not match');
      return false;
    }
    return true;
  };

  const registerUser = () => {
    if (validateFields()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          collection(firestore, 'users');
          setDoc(doc(firestore, 'users', res.user.uid), {
            id: res.user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdAt: new Date(),
          })
            .catch(err => console.log(err));
          navigation.navigate("Login");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inputView}>
        <SafeAreaView style={styles.textBoxContainer}>
          <Image
            style={styles.image}
            source={require('../assets/logo.png')}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <Text style={styles.register}>Register with us</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='First Name'
            placeholderTextColor={Colors.placeholderColor}
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <Text style={styles.errorMsg}>{firstNameError}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Last Name'
            placeholderTextColor={Colors.placeholderColor}
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <Text style={styles.errorMsg}>{lastNameError}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Email'
            placeholderTextColor={Colors.placeholderColor}
            onChangeText={(value) => validateEmail(value)}
            textContentType='emailAddress'
          />
          <Text style={styles.errorMsg}>{emailError}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            placeholderTextColor={Colors.placeholderColor}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Text style={styles.errorMsg}>{pwError}</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Confirm Password'
            placeholderTextColor={Colors.placeholderColor}
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
          <TextInput
            style={styles.errorMsg}
            onChangeText={(pwError) => setPWError(pwError)}
          >
            {pwError}
          </TextInput>
        </SafeAreaView>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            registerUser();
          }}
        >
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 110,
    height: 150,
  },
  register: {
    fontSize: 24,
    textAlign: 'center',
  },
  inputView: {
    width: '70%',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    backgroundColor: Colors.inputBackgroundColor,
    borderColor: Colors.inputBackgroundColor,
    borderRadius: 20,
    textAlign: 'center',
    width: '100%',
  },
  textBoxContainer: {
    margin: 10,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  submitBtn: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btnBackgroundColor,
    color: 'white',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
});

export default RegisterPage;
