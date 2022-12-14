import * as Location from 'expo-location';
import { Platform, StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from "./screens/HomeScreen";
// import SettingScreen from "./screens/SettingScreens";
// import SigninScreen from "./screens/SigninScreen";
// import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "../screens/MapScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import PlacesSavedScreen from "../screens/PlacesSavedScreen"
import ProfileScreen from "../screens/ProfileScreen";

// Création constante BottomTabNav
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Création Tabs
const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName='Map'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 10,
                    left: 35,
                    right: 35,
                    elevation: 0,
                    backgroundColor: "#1E90FF",
                    borderRadius: 40,
                    height: 60,
                    borderTopColor: "transparent",
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ ...styles.container, top: 3.5 }}>
                        <Image
                            source={require("../assets/home.png")}
                            resizeMode="contain"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#1933a3" : "#fff"
                            }}
                        />
                        <Text style={{ color: focused ? "#1933a3" : "#fff", fontSize: 12 }}>Home</Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Places" component={PlacesSavedScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ ...styles.container }}>
                        <Image
                            source={require("../assets/heart.png")}
                            resizeMode="contain"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 30,
                                height: 30,
                                tintColor: focused ? "#1933a3" : "#fff"
                            }}
                        />
                        <Text style={{ color: focused ? "#1933a3" : "#fff", fontSize: 12 }}>Place</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Chatbot" component={ChatBotScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ ...styles.container }}>
                        <Image
                            source={require("../assets/tchat.png")}
                            resizeMode="contain"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 30,
                                height: 30,
                                tintColor: focused ? "#1933a3" : "#fff"
                            }}
                        />
                        <Text style={{ color: focused ? "#1933a3" : "#fff", fontSize: 12 }}>Chatbot</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ ...styles.container }}>
                        <Image
                            source={require("../assets/profil.png")}
                            resizeMode="contain"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 30,
                                height: 30,
                                tintColor: focused ? "#1933a3" : "#fff"
                            }}
                        />
                        <Text style={{ color: focused ? "#1933a3" : "#fff", fontSize: 12 }}>Profil</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            android: {
                alignItems: "center",
                justifyContent: "center",
            },
            ios: {
                marginTop: 8,
                alignItems: "center",
            },
            default: {
                // other platforms, web for example
                backgroundColor: 'blue'
            }
        })
    },
    shadow: {
        shadowColor: "#7F5DF0",
        textShadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});


export default Tabs;


























// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 // showLabel: false,
//                 tabBarStyle: {
//                     position: "absolute",
//                     bottom: 25,
//                     left: 40,
//                     right: 40,
//                     elevation: 0,
//                     backgroundColor: "#1E90FF",
//                     borderRadius: 20,
//                     height: 50,
//                 }
//             }}
//         >
//             <Tab.Screen name="Map" component={MapScreen} />
//             <Tab.Screen name="Places" component={PlacesSavedScreen} />
//             <Tab.Screen name="Chatbot" component={ChatBotScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     )
// }

// const style = StyleSheet.create

// export default Tabs;