import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/colors';
import uuid from 'react-uuid';
import { auth, firestore } from '../firebase/config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';


const AddPetScreen = ({ navigation }) => {
    const [petName, setPetName] = useState('');
    const [petStatus, setPetStatus] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [petBreed, setPetBread] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petHoroscope, setPetHoroscope] = useState('');
    const [petHeight, setPetHeight] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petNeuteredStatus, setPetNeuteredStatus] = useState('');
    const [petAboutMe, setPetAboutMe] = useState('');
    const [petDistinguishingFeatures, setPetDistinguishingFeatures] = useState('');
    const [petTrivia, setPetTrivia] = useState('');
    const [petFiveWordsToDescribeMe, setPetFiveWordsToDescribeMe] = useState('');
    const [petUnderstandsTheseWords, setPetUnderstandsTheseWords] = useState('');
    const [petDoesNotUnderstandTheseWords, setPetDoesNotUnderstandTheseWords] = useState('');
    const [petPlayBuddyWanted, setPetPlayBuddyWanted] = useState('');
    const [petPetShareWanted, setPetPetShareWanted] = useState('');
    const [petReallyLikes, setPetReallyLikes] = useState('');
    const [petReallyDislikes, setPetReallyDislikes] = useState('');
    const [petAfraidOf, setPetAfraidOf] = useState('');
    const [petHabits, setPetHabits] = useState('');
    const [petDiet, setPetDiet] = useState('');
    const [petSpecialTalents, setPetSpecialTalents] = useState('');
    const [petJob, setPetJob] = useState('');
    const [petGratefulFor, setPetGratefulFor] = useState('');
    const [petHowIJoinedMyFamily, setPetHowIJoinedMyFamily] = useState('');
    const [petHealthAndMedical, setPetHealthAndMedical] = useState('');
    const [petCompetitionsAndCourses, setPetCompetitionsAndCourses] = useState('');
    const [petFavouriteFoodAndTreats, setPetFavouriteFoodAndTreats] = useState('');
    const [petPersonality, setPetPersonality] = useState('');
    const [petMyVet, setPetMyVet] = useState('');
    const [petOtherServices, setPetOtherServices] = useState('');
    const [petBestAnimalFriends, setPetBestAnimalFriends] = useState('');
    const [petBestHumanFriends, setPetBestHumanFriends] = useState('');
    const [petVaccinations, setPetVaccinations] = useState('');
    const [petNameError, setPetNameError] = useState('');
    const [petStatusError, setPetStatusError] = useState('');
    const [petSpeciesError, setPetSpeciesError] = useState('');

    // Method to validate all fields on the press of submit button
    const validateFields = () => {
      if (petName.length < 1) {
        setPetNameError('Pet Name is required');
        return false;
      }
      if (petStatus.length < 1) {
        setPetStatusError('Pet Status is required');
        return false;
      }
      if (petSpecies.length < 1) {
        setPetSpeciesError('Pet Species is required');
        return false;
      }
      return true;
    };
  
    const registerPet = async () => {
      if (validateFields()) {
        const user = auth.currentUser;
        const userId = user.uid;
        const pet = {
          id: uuid(),
          userId,
          petName,
          petStatus,
          petSpecies,
          petBreed,
          petAge,
          petHoroscope,
          petHeight,
          petWeight,
          petNeuteredStatus,
          petAboutMe,
          petDistinguishingFeatures,
          petTrivia,
          petFiveWordsToDescribeMe,
          petUnderstandsTheseWords,
          petDoesNotUnderstandTheseWords,
          petPlayBuddyWanted,
          petPetShareWanted,
          petReallyLikes,
          petReallyDislikes,
          petAfraidOf,
          petHabits,
          petDiet,
          petSpecialTalents,
          petJob,
          petGratefulFor,
          petHowIJoinedMyFamily,
          petHealthAndMedical,
          petCompetitionsAndCourses,
          petFavouriteFoodAndTreats,
          petPersonality,
          petMyVet,
          petOtherServices,
          petBestAnimalFriends,
          petBestHumanFriends,
          petVaccinations,
          createdAt: serverTimestamp()
        }
        await setDoc(doc(firestore, 'pets', pet.id), pet);
        navigation.navigate('Home');
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
            <Text style={styles.register}>Add a Pet</Text>
          </SafeAreaView>

          <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollViewContainer}>
  
            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Name'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petName) => setPetName(petName)}
                />
                <Text style={styles.errorMsg}>{petNameError}</Text>
            </SafeAreaView>
    
            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Species ex. dog, cat, etc.'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petSpecies) => setPetSpecies(petSpecies)}
                />
                <Text style={styles.errorMsg}>{petSpeciesError}</Text>
            </SafeAreaView>
    
            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Status ex. active, lost, for adoption, etc.'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petStatus) => setPetStatus(petStatus)}
                />
                <Text style={styles.errorMsg}>{petStatusError}</Text>
            </SafeAreaView>
    
            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Breed'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petBreed) => setPetBread(petBreed)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Age'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petAge) => setPetAge(petAge)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Horoscope'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petHoroscope) => setPetHoroscope(petHoroscope)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Height'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petHeight) => setPetHeight(petHeight)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Weight'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petWeight) => setPetWeight(petWeight)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Neutered, Spayed, Intact'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petNeuteredStatus) => setPetNeuteredStatus(petNeuteredStatus)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='About Me'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petAboutMe) => setPetAboutMe(petAboutMe)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Trademark/Distinguishing Features'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petDistinguishingFeatures) => setPetDistinguishingFeatures(petDistinguishingFeatures)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Trivia'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petTrivia) => setPetTrivia(petTrivia)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='5 words to describe your pet'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petFiveWordsToDescribeMe) => setPetFiveWordsToDescribeMe(petFiveWordsToDescribeMe)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Understands these words'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petUnderstandsTheseWords) => setPetUnderstandsTheseWords(petUnderstandsTheseWords)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Does not understand these words'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petDoesNotUnderstandTheseWords) => setPetDoesNotUnderstandTheseWords(petDoesNotUnderstandTheseWords)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Playbuddy Wanted (Yes/No)'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petPlayBuddyWanted) => setPetPlayBuddyWanted(petPlayBuddyWanted)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Pet Share Wanted (Yes/No)'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petPetShareWanted) => setPetPetShareWanted(petPetShareWanted)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Really Likes'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petReallyLikes) => setPetReallyLikes(petReallyLikes)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Really Dislikes'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petReallyDislikes) => setPetReallyDislikes(petReallyDislikes)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Afraid of'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petAfraidOf) => setPetAfraidOf(petAfraidOf)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Habits good or bad'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petHabits) => setPetHabits(petHabits)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Diet ex. raw, kibble, mixed, etc.'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petDiet) => setPetDiet(petDiet)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Special Talents'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petSpecialTalents) => setPetSpecialTalents(petSpecialTalents)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Job'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petJob) => setPetJob(petJob)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Grateful for'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petGratefulFor) => setPetGratefulFor(petGratefulFor)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='How I Joined My Family'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petHowIJoinedMyFamily) => setPetHowIJoinedMyFamily(petHowIJoinedMyFamily)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Health and medical conditions'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petHealthAndMedical) => setPetHealthAndMedical(petHealthAndMedical)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Competitons and Courses Attended'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petCompetitionsAndCourses) => setPetCompetitionsAndCourses(petCompetitionsAndCourses)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Favourite Food and Treats'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petFavouriteFoodAndTreats) => setPetFavouriteFoodAndTreats(petFavouriteFoodAndTreats)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Personality'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petPersonality) => setPetPersonality(petPersonality)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Veterinarian (add URL)'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petMyVet) => setPetMyVet(petMyVet)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Other Services (add URL)'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petOtherServices) => setPetOtherServices(petOtherServices)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Best Animal Friends'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petBestAnimalFriends) => setPetBestAnimalFriends(petBestAnimalFriends)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Best Human Friends'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petBestHumanFriends) => setPetBestHumanFriends(petBestHumanFriends)}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.textBoxContainer}>
                <TextInput
                style={styles.textInput}
                placeholder='Vaccinations'
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={(petVaccinations) => setPetVaccinations(petVaccinations)}
                />
            </SafeAreaView>

          </ScrollView>
  
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => registerPet()}
          >
            <Text style={styles.loginText}>Add</Text>
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
      width: 120,
      height: 150,
    },
    register: {
      fontSize: 24,
      textAlign: 'center',
    },
    inputView: {
      width: '80%',
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
      width: '96%',
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
    scrollViewContainer: {
        height: 300,
        marginBottom: 50,
    },
});
  
export default AddPetScreen;
  