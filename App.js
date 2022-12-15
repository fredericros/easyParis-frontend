import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreens";
import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import ChatBotScreen from "./screens/ChatBotScreen";
import PlacesSavedScreen from "./screens/PlacesSavedScreen"
import ProfileScreen from "./screens/ProfileScreen";
import Tabs from "./navigation/tabs";
import CardInfoScreen from "./screens/CardInfoScreen";
import CardScreen from './screens/CardScreen'
// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reviews from './reducers/reviews';
import user from './reducers/user';
import like from './reducers/like';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const reducers = combineReducers({ user, reviews, like });
const persistConfig = { key: 'easyParis', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);


const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <NavigationContainer>
        {/*Ancienne façon d'appeler le screen Tabs*/}
        {/* <Tabs /> */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name='SignIn' component={SigninScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
          <Stack.Screen name='CardInfoScreen' component={CardInfoScreen} /> 
          <Stack.Screen name='CardScreen' component={CardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  )
}

export default App;