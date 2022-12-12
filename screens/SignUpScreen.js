import { StatusBar } from 'expo-status-bar';
import { TextInput, ImageBackground, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";

// const res = await DocumentPicker.pick({
//     type: [DocumentPicker.types.allFiles],
// });
// this.setState({ singleFile: res });

// const data = new FormData();
// data.append('name', 'Image Upload');
// data.append('file_attachment', fileToUpload);

// let uploadImage = async () => {
//     if (singleFile != null) {
//         const fileToUpload = singleFile;
//         const data = new FormData();
//         data.append('name', 'Image Upload');
//         data.append('file_attachment', fileToUpload);
//         let res = await fetch(
//             'http://localhost//webservice/user/uploadImage',
//             {
//                 method: 'post',
//                 body: data,
//                 headers: {
//                     'Content-Type': 'multipart/form-data; ',
//                 },
//             }
//         );
//         let responseJson = await res.json();
//         if (responseJson.status == 1) {
//             alert('Upload Successful');
//         }
//     } else {
//         //if no file selected the show alert
//         alert('Please Select File first');
//     }
// };

export default function SignUpScreen({ navigation }) {
    return (


        <View style={styles.container} >

            <TouchableOpacity style={styles.buttonpicture} activeOpacity={0.8}>
                <Text style={styles.pic}>Easy Paris </Text>
            </TouchableOpacity>
            <TextInput style={styles.buttonsignin} placeholder="Username" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder="Email" activeOpacity={0.8} />

            <TextInput style={styles.buttonsignin} placeholder="Password" activeOpacity={0.8} />

            <TextInput style={styles.buttonabout} placeholder="About you" activeOpacity={0.8} />

            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <text>Sign up</text>
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
    },
    logo: {
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
        color: 'white',
        fontSize: 21,
        textAlign: "center",
        padding: 8,
        margin: 8,
        backgroundColor: '#1E90FF',
        width: 260,
        height: 40,
        borderRadius: 15,
        marginBottom: 50,
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
    }

}); 