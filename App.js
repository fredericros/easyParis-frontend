import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
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
import Tabs from "./navigation/tabs"


const App = () => {
  return (
    <NavigationContainer >
      <Tabs />
    </NavigationContainer>
  )

}

export default App;