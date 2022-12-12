import { TextInput, StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default function SigninScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logoeiffel1.jpg')} />

            <TouchableOpacity style={styles.buttonup} activeOpacity={0.8}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.barre}></Text>

            <TextInput style={styles.buttonsignin} placeholder=" Username" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder=" Password" activeOpacity={0.8} />

            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
        marginTop: 20,
        alignItems: 'center',
        padding: 5,
        margin: 5,
        width: 260,
        height: 40,
        borderRadius: 15
    },
    text: {
        color: 'white',
        fontSize: 25,
    },
    textforget: {
        color: 'black',
        fontSize: 15,
    }

});