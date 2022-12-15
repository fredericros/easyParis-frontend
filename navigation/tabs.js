import * as Location from "expo-location";
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import HomeScreen from "./screens/HomeScreen";
// import SettingScreen from "./screens/SettingScreens";
// import SigninScreen from "./screens/SigninScreen";
// import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "../screens/MapScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import PlacesSavedScreen from "../screens/PlacesSavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CardScreen from "../screens/CardScreen";
import CardInfoScreen from "../screens/CardInfoScreen";

// Création constante BottomTabNav
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Création Tabs
const Tabs = () => {
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
            paddingBottom:5,
            paddingTop:5,
            ...styles.shadow,
          },
          
        tabBarActiveTintColor: '#FCBC62',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
      })}>
       
      <Tab.Screen name="Map" component={MapScreen}/>
      <Tab.Screen name="Places" component={PlacesSavedScreen}/>
      <Tab.Screen name="Chatbot" component={ChatBotScreen}/>
      <Tab.Screen name="Profile" component={CardScreen}/>
    </Tab.Navigator>
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

export default Tabs;



/*

PLATFORM.OS => Permet de gérer le style android/iOS

  container: {
    flex: 1,
    ...Platform.select({
      android: {
        alignItems: "center",
        justifyContent: "center",
      },
      ios: {

      },
      default: {
        // other platforms, web for example
        backgroundColor: "blue",
      },
    }),
  },


*/