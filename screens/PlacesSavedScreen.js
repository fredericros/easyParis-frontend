import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useEffect } from 'react';

export default function PlacesSavedScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
<View style={styles.styleHeader}> 
    <Text style={styles.styleTextHeader}>MY SAVED {"\n"}PLACES</Text>
    <Image source={require('../assets/logoeiffel1.jpg')} style={{width: 100, height: 130, borderRadius: 50}} />
</View>

<View style={styles.bodyContainer}>
    <View> 
        <Image source={require('../assets/logoeiffel1.jpg')} style={{width: 70, height: 100, marginRight: 5,}} />
    </View>
    <View style={styles.bodyTextContainer}>
        <Text>Eiffel Tower</Text>
        <Text>Lorem imsun bla blb alb alblblbl</Text>
    </View>
    <View style={styles.deleteBtnContainer}>
    <TouchableOpacity style={styles.deleteBtn}>
                  <FontAwesome name="trash" size={40} color="black" />
                </TouchableOpacity>
    </View>
</View>

<View style={styles.bodyContainer}>
    <View> 
        <Image source={require('../assets/logoeiffel1.jpg')} style={{width: 70, height: 100, marginRight: 5,}} />
    </View>
    <View style={styles.bodyTextContainer}>
        <Text>Eiffel Tower</Text>
        <Text>Lorem imsun bla blb alb alblblbl</Text>
    </View>
    <View style={styles.deleteBtnContainer}>
    <TouchableOpacity style={styles.deleteBtn}>
                  <FontAwesome name="trash" size={40} color="black" />
                </TouchableOpacity>
    </View>
</View>

<View style={styles.bodyContainer}>
    <View> 
        <Image source={require('../assets/logoeiffel1.jpg')} style={{width: 70, height: 100, marginRight: 5,}} />
    </View>
    <View style={styles.bodyTextContainer}>
        <Text>Eiffel Tower</Text>
        <Text>Lorem imsun bla blb alb alblblbl</Text>
    </View>
    <View style={styles.deleteBtnContainer}>
    <TouchableOpacity style={styles.deleteBtn}>
                  <FontAwesome name="trash" size={40} color="black" />
                </TouchableOpacity>
    </View>
</View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
   backgroundColor: 'white',
    },
    title: {
        color: 'black',
        fontSize: 25,
    },
    back: {
        position: "absolute",
        left: 50,
        top: 50,
    },
    styleHeader:{
        flexDirection: 'row',
        alignItems: 'center',
   
    },

    styleTextHeader:{
        fontSize: 20,
        fontSize: 30,    
    fontWeight: "600",
    fontFamily: "Poppins_700Bold",
    },

    bodyContainer:{
flexDirection: 'row',
justifyContent: 'flex-start',
alignItems: 'flex-start',
paddingLeft: 30,
paddingRight: 30,

    },

    bodyTextContainer:{
        height: 100, 
        width: '70%',
      justifyContent: 'center',
     borderBottomWidth: 1,  
     borderStyle: 'solid',
      marginBottom: 20,
    },

    deleteBtn:{

    },

    deleteBtnContainer:{
justifyContent: 'center',
height: 100, 

    }

}); 