import { StyleSheet, } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";


import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import ChatBotScreen from "./screens/ChatBotScreen";
import PlacesSavedScreen from "./screens/PlacesSavedScreen";
import ProfileScreen from "./screens/ProfileScreen";

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reviews from "./reducers/reviews";
import user from "./reducers/user";
import like from "./reducers/like";
import places from "./reducers/places";

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
  reducer: { user, reviews, like, places },
});

const TabNavigator = () => {
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
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


const App = () => {
  return (
    // <PersistGate persistor={persistor}  =======  MISE EN PLACE DU PERSIST STORE
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="SignIn" component={SigninScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
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
});

export default App;
