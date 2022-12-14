import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from 'expo-location';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
// import HomeScreen from "./screens/HomeScreen";
// import SettingScreen from "./screens/SettingScreens";
// import SigninScreen from "./screens/SigninScreen";
// import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "../screens/MapScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import PlacesSavedScreen from "../screens/PlacesSavedScreen"
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                showLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 15,
                    left: 40,
                    right: 40,
                    elevation: 0,
                    backgroundColor: "#1E90FF",
                    borderRadius: 20,
                    height: 50,
                    color: "black",
                    ...styles.shadow
                }

            }}
        >
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center", top: 9 }}>
                        <Image
                            source={require("../assets/home.png")}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#1933a3" : "#fff"
                            }}
                        />
                        <Text style={{ color: focused ? "#1933a3" : "#fff", fontSize: 12 }}></Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Places" component={PlacesSavedScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center", top: 8 }}>
                        <Image
                            source={require("../assets/heart.png")}
                            resizeMode="contain"
                            style={{
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
                    <View style={{ alignItems: "center", justifyContent: "center", top: 8 }}>
                        <Image
                            source={require("../assets/tchat.png")}
                            resizeMode="contain"
                            style={{
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
                    <View style={{ alignItems: "center", justifyContent: "center", top: 8 }}>
                        <Image
                            source={require("../assets/profil.png")}
                            resizeMode="contain"
                            style={{
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