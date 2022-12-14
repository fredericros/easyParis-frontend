import { TextInput, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";


export default function SigninScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../assets/logoeiffel1.jpg')} resizeMode="contain" />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.buttonup} activeOpacity={0.8}>
                <Text style={styles.text} textAlign="center" width="100%">Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.barre}></Text>

            <TextInput style={styles.buttonsignin} placeholder=" Username" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder=" Password" activeOpacity={0.8} />

            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.text} textAlign="center" width="100%">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonforget} activeOpacity={0.8}>
                <Text style={styles.textforget}>FORGOT PASSWORD</Text>
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
        top: 80,
    },
    logo: {
        width: "60%",
        height: "40%",
        marginBottom: 20,
    },
    buttonup: {
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
        marginBottom: 50,
    },
    buttonsignin: {
        display: 'flex',
        justifyContent: "center",
        padding: 10,
        margin: 8,
        backgroundColor: "rgb(158, 202, 241)",
        opacity: .7,
        width: 260,
        height: 40,
        borderRadius: 15
    },
    barre: {
        border: "1px solid grey",
        width: 240,
        margin: 15,
    },
    buttonforget: {
        marginTop: -10,
        alignItems: 'center',
        padding: 5,
        margin: 5,
        width: 260,
        height: 40,
        borderRadius: 15
    },
    text: {
        width: "100%",
        color: 'white',
        fontSize: 25,
    },
    textforget: {
        color: 'black',
        fontSize: 15,
    }

});
















// import {
//     Button,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
// } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { useEffect } from 'react';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export default function ProfileScreen({ navigation }) {

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//             <Text style={styles.title}>Welcome to ProfileScreen</Text>
//             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
//                 <Text style={styles.text}>Déconnexion</Text>
//             </TouchableOpacity>
//         </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         color: 'black',
//         fontSize: 25,
//     },
//     button: {
//         alignItems: 'flex-end',
//         justifyContent: 'center',
//         width: 30,
//         height: 100,
//         backgroundColor: 'black',
//     },
//     button: {
//         alignItems: 'center',
//         padding: 5,
//         margin: 5,
//         backgroundColor: '#1E90FF',
//         width: 260,
//         height: 40,
//         borderRadius: 10,
//         marginBottom: 50,
//     },
//     text: {
//         color: 'white',
//         fontSize: 25,
//     },
// });