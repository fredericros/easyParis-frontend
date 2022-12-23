import { Platform, StyleSheet, } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Imagepicker from 'expo-image-picker';
import Constants from 'expo-constants';

import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import ChatBotScreen from "./screens/ChatBotScreen";
import PlacesSavedScreen from "./screens/PlacesSavedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DirectionMapScreen from "./screens/DirectionMapScreen";

// redux imports
import { Provider, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reviews from "./reducers/reviews";
import user from "./reducers/user";
import like from "./reducers/like";
import actualPlaces from "./reducers/actualPlaces";
import allPlaces from "./reducers/allPlaces";
import filteredPlaces from "./reducers/allPlaces";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ============ MISE EN PLACE DU PERSIST STORE ====================

const reducers = combineReducers({ user, reviews, like });
const persistConfig = { key: 'easyParis', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

==================================================================== */

const store = configureStore({
  reducer: { user, reviews, like, filteredPlaces, actualPlaces, allPlaces },
});


const TabNavigator = () => {

  const user = useSelector((state) => state.user.value)


  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Map') {
          iconName = 'home';
        } else if (route.name === 'Places') {
          iconName = 'heart';
        } else if (route.name === 'Chatbot') {
          iconName = 'twitch';
        } else if (route.name === 'Profile') {
          iconName = 'user-circle';
        }
        return <FontAwesome name={iconName} size={28} color={color} />;
      },

      tabBarStyle: {
        position: "absolute",
        bottom: 20,
        left: 25,
        right: 25,
        backgroundColor: "#1E90FF",
        borderRadius: 40,
        height: 60,
        borderTopColor: "transparent",
        paddingBottom: 5,
        paddingTop: 5,
        ...styles.shadow,
      },

      tabBarActiveTintColor: '#FCBC62',
      tabBarInactiveTintColor: '#fff',
      headerShown: false,
    })}>

      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Places" component={PlacesSavedScreen} />
      <Tab.Screen name="Chatbot" component={ChatBotScreen} />
      <Tab.Screen name="Profile" component= {!user.token? SigninScreen : ProfileScreen} />
    </Tab.Navigator>
  );
};


const App = () => {
  // const [image, setImage] = useState(null);

  // useEffect(async () => {
  //   if (Platform.OS !== 'web') {
  //     const { status } = await Imagepicker.requestMediaLibraryPermissionsAsync()
  //     if (status !== 'granted') {
  //       alert('Permission denied!')
  //     }
  //   }
  // }, [])

  // const PickImage = async () => {
  //   let result = await Imagepicker.launchImageLibraryAsync({
  //     mediaTypes: Imagepicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1
  //   })
  //   if (!result.cancelled) {
  //     setImage(result.uri)
  //   }
  // }
  return (
    // <PersistGate persistor={persistor}  =======  MISE EN PLACE DU PERSIST STORE
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="SignUp" component={SignUpScreen} /> 
          <Stack.Screen name="DirectionMapScreen" component={DirectionMapScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </PersistGate>  =======  MISE EN PLACE DU PERSIST STORE
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  none: {
    display: "none"
  },
});

export default App;
