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
// import { Dimensions } from 'react-native';


// const screenWidth = Dimensions.get('window').width;

// const tabBarWidth = screenWidth * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {

    return (
      <Tab.Navigator screenOptions={({ route }) => ({

        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (

            route.name
            === 'Map') {
            iconName = 'map-marker';
          } else if (
            route.name
            === 'Places') {
            iconName = 'heart';
          } else if (
            route.name
            === 'Chatbot') {
            iconName = 'comments-o';
          } else if (
            route.name
            === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#1933a3',
        tabBarInactiveTintColor: '#fafafc',
        headerShown: false,
        tabBarActiveBackgroundColor: '#1E90FF',
        tabBarInactiveBackgroundColor: '#1E90FF',

      })}>

        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Places" component={PlacesSavedScreen} />
        <Tab.Screen name="Chatbot" component={ChatBotScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator >


    );
  }

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SignIn' component={SigninScreen} />
        <Stack.Screen name='Signup' component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};