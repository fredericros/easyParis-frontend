import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { login, logout } from '../reducers/user';


//Import SignIn
import { useDispatch, useSelector } from 'react-redux';
import { user, tweet, review } from '../reducers/user';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function SigninScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const signSubmit = () => {
        fetch('http://192.168.1.15:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        }).then(response => response.json())
            .then(data => {
                data.result && dispatch(login({ token: data.token, username: data.username }));
            });
        if (user.token) {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../assets/logoeiffel1.jpg')} resizeMode="contain" />

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.barre}></Text>

            <TextInput onChangeText={(value) => setUsername(value)} value={username} style={styles.buttonsignin} placeholder=" Username" activeOpacity={0.8} />

            <TextInput onChangeText={(value) => setPassword(value)} value={password} style={styles.buttonsignin} placeholder=" Password" activeOpacity={0.8} />

            <TouchableOpacity onPress={() => signSubmit()} style={styles.button} activeOpacity={0.8}>
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