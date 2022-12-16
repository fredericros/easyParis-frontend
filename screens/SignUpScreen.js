import { StatusBar } from 'expo-status-bar';
import { TextInput, ImageBackground, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function SignUpScreen({ navigation }) {
    return (


        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.back}>
                <Text> Back to home</Text>
            </TouchableOpacity>

            <Image style={styles.logo} source={require('../assets/logoeiffel1.jpg')} resizeMode="contain" />

            <TextInput style={styles.buttonsignin} placeholder="Username" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder="Email" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder="Password" activeOpacity={0.8} />

            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.buttonforget} activeOpacity={0.8}>
                <Text style={styles.textforget}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    back: {
        position: "absolute",
        left: 50,
        top: 50,
    },
    logo: {
        width: "60%",
        height: "40%",
        marginBottom: 20,
    },
    buttonpicture: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        margin: 8,
        opacity: .7,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#1E90FF',
        backgroundColor: '#1E90FF',
        marginBottom: 30,
    },
    pic: {
        color: "black",
        fontWeight: "bold",
        fontSize: 19,
        color: "white",
    },
    buttonabout: {
        display: 'flex',
        justifyContent: "center",
        textAlign: "center",
        padding: 8,
        margin: 8,
        backgroundColor: '#rgb(158, 202, 241)',
        opacity: .7,
        width: 260,
        height: 140,
        borderRadius: 15,
    },
    buttonup: {
        display: 'flex',
        justifyContent: "center",
        padding: 8,
        margin: 8,
        backgroundColor: '#1E90FF',
        width: 260,
        height: 40,
        borderRadius: 15,
        marginBottom: 20,
    },
    button: {
        display: 'flex',
        justifyContent: "center",
        textAlign: "center",
        padding: 5,
        margin: 5,
        backgroundColor: '#1E90FF',
        width: 260,
        height: 40,
        borderRadius: 15,
        marginBottom: 10,
        alignItems: 'center'
    },
    buttonsignin: {
        display: 'flex',
        justifyContent: "center",
        padding: 8,
        margin: 8,
        backgroundColor: '#rgb(158, 202, 241)',
        opacity: .7,
        width: 260,
        height: 40,
        borderRadius: 15
    },
    barre: {
        margin: 30,
    },
    buttonforget: {
        marginTop: 20,
        alignItems: 'center',
        padding: 8,
        margin: 8,
        width: 260,
        height: 40,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 25,
    },
    textforget: {
        color: 'black',
        fontSize: 15,
    },
    signup: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }

}); 