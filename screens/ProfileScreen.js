
import { Button, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { stopLocationUpdatesAsync } from 'expo-location';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { user, tweet, review } from '../reducers/user';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { login, logout } from '../reducers/user';
import * as Imagepicker from 'expo-image-picker';
import Constants from 'expo-constants';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function ProfileScreen({ navigation }) {

    /*----------------------------------- IMAGE PICKER -----------------------------------*/
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function requestPermissions() {
            if (Platform.OS !== 'web') {
                const { status } = await Imagepicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission denied!');
                }
            }
        }
        requestPermissions();

        // Vérification de l'existence de la méthode destroy et appel de cette méthode si elle existe
        return () => {
            if (Imagepicker.destroy) {
                Imagepicker.destroy();
            }
        }
    }, []);

    const PickImage = async () => {
        let result = await Imagepicker.launchImageLibraryAsync({
            mediaTypes: Imagepicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            // Affiche l'image selectionné, ne pas modifier
            setImage(result.assets[0].uri);
        }
    };
    /*----------------------------------- FIN IMAGE PICKER -----------------------------------*/

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value) 


    const Page = () => {
        const dispatch = useDispatch();
        const user = useSelector((state) => state.user.value);

        //pas sur pour le l'écriture de la route
        fetch(`http://localhost:3000/users/${user.token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })
            .then(response => response.json())
            .then(data => {
                if (user.token) {
                    return <ProfileScreen />;
                } else {
                    return <SignInScreen />;
                }
            });
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.borderContainer}>
                    <View style={styles.border}>
                        <Button title="+Add picture" onPress={PickImage} style={{ width: 200, height: 200 }} activeOpacity={0.5}> <Text style={styles.add}>+Add picture</Text></Button>

                        {Image && <Image source={{ uri: image }} style={styles.add} />}
                        {/* <Text onPress={() => navigation.navigate('SignIn')} style={styles.add} activeOpacity={0.5}>+ Add picture</Text> */}
                    </View>

                    <View style={styles.containerProfil}>
                        <Text style={styles.welcome}>Welcome,</Text>
                        <Text style={styles.name}>{user.username}</Text>
                        <View style={styles.logoutContainer}>
                            <Text onPress={() => { dispatch(logout()); navigation.navigate('Home'); console.log('ok') }} style={styles.logout}>Logout</Text>
                        </View>
                    </View>

                    <View style={styles.descriptionBackground}>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionbutton}>Description</Text>
                            <Text style={styles.editButton}>Edit</Text>
                        </View>
                        <TextInput style={styles.containerAboutYou} placeholder="About me" />
                    </View>

                    <View style={styles.reviewBackground}>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionbutton}>My Reviews</Text>
                            <Text style={styles.editButton}>0</Text>
                        </View>
                        <Text style={styles.containerAboutYou}></Text>
                    </View>
                </View>

        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: -90,
    },
    borderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        // borderWidth: 4,
        // borderColor: "#1E90FF",
    },
    border: {
        borderWidth: 4,
        borderColor: "#1E90FF",
        borderRadius: 80,
        backgroundColor: "#rgba(158, 202, 241, .4)",
        justifyContent: "center",
        alignItems: "center",
        height: 160,
        width: 160,
        marginTop: 50,
        marginLeft: -10,
    },
    add: {
        // borderWidth: 4,
        // borderColor: "#1E90FF",
        backgroundColor: "transparent",
        padding: 50,
        borderRadius: 80
    },
    containerProfil: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    welcome: {
        justifyContent: "center",
        marginLeft: 15,
        fontSize: 40,
        color: "#1E90FF"
    },
    name: {
        justifyContent: "center",
        marginLeft: 18,
        fontSize: 30,
        color: "black"
    },
    logoutContainer: {
        display: "flex",
        marginTop: 15
    },
    logout: {
        backgroundColor: "#rgba(158, 202, 241, .4)",
        height: 40,
        width: 140,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 20,
        fontSize: 20,
        marginLeft: 20,
    },
    descriptionBackground: {
        backgroundColor: "#rgba(158, 202, 241, .4)",
        marginTop: 50,
        width: "80%",
        height: 200,
        borderRadius: 30,
    },
    descriptionContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1E90FF",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "87%",
        display: "flex",
        height: 50,
        borderRadius: 30,
        paddingLeft: 15,
        borderWidth: 4,
        borderColor: "#1E90FF",
    },
    descriptionbutton: {
        display: "flex",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    editButton: {
        backgroundColor: "#fff",
        textAlignVertical: "center",
        height: 50,
        width: "40%",
        borderRadius: 30,
        marginLeft: 88,
        borderWidth: 2,
        borderColor: "#1E90FF",
        textAlign: "center",
        fontSize: 20,
        flexWrap: "nowrap",

    },
    containerAboutYou: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 105
    },
    barre: {
        borderWidth: 1,
        borderColor: "#9d9da3",
    },
    reviewBackground: {
        backgroundColor: "#d5d5da",
        marginTop: 10,
        width: "80%",
        height: 230,
        borderRadius: 30,
    },
});

