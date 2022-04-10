import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPostScreen from './screens/AddPostScreen';
import SaveScreen from './screens/SaveScreen';
import CommunityScreen from './screens/CommunityScreen';
import SinglePostScreen from './screens/SinglePostScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AddCommentScreen from './screens/AddCommentScreen';
import AddPetScreen from './screens/AddPetScreen';
import OtherProfileScreen from './screens/OtherProfileScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const Root = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Add Post') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color='green' />;
          },
        };
      }}
      tabBarOptions={{ activeTintColor: 'green', inactiveTintColor: 'gray' }}
      >
      <Tabs.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
      <Tabs.Screen name='Add Post' component={AddPostScreen} options={{ headerShown: false}}/>
      <Tabs.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false}}/>
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Save'
            component={SaveScreen}
          />
          <Stack.Screen name='Home' component={Root} options={{ headerShown: false }}/>
          <Stack.Screen name='Community' component={CommunityScreen} options={{headerShown: true}} />
          <Stack.Screen name='Single Post' component={SinglePostScreen} options={{headerShown: true}} />
          <Stack.Screen name='Edit Profile' component={EditProfileScreen} options={{headerShown: true}} />
          <Stack.Screen name='Add Comment' component={AddCommentScreen} options={{headerShown: true}} />
          <Stack.Screen name='Add Pet' component={AddPetScreen} options={{headerShown: true}} />
          <Stack.Screen name="Other Profile" component={OtherProfileScreen} options={{headerShown: false}} />
          <Stack.Screen name="Search Results" component={SearchResultsScreen} options={{headerShown: true}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
