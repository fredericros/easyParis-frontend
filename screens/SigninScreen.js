import { TextInput, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function SigninScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../assets/logoeiffel1.jpg')} resizeMode="contain" />

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.barre}></Text>

            <TextInput style={styles.buttonsignin} placeholder=" Username" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder=" Password" activeOpacity={0.8} />

            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.text}>Sign In</Text>
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
        alignItems: 'center',
        padding: 5,
        margin: 5,
        width: 260,
        height: 40,
        borderRadius: 15
    },
    text: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 20,
    },
    textforget: {
        color: 'black',
        fontSize: 15,
    }

}); 