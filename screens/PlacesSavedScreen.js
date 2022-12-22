import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllPlaces } from "../reducers/allPlaces";
import { useFocusEffect } from '@react-navigation/native';
import { likePlace } from "../reducers/filteredPlaces";
import React from "react";


export default function PlacesSavedScreen({ navigation }) {
  const dispatch=useDispatch()
  const [countLike, setCountLike] = useState(false)
  const actualPlace = useSelector((state) => state.actualPlaces.value);
  
  useFocusEffect(
    React.useCallback(() => {
      fetch(`http://192.168.10.168:3000/places`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadAllPlaces(data.places));
        console.log("rerender");
      });
  
  }, [])
  );

  // const handleLike = () => {
  //   setCountLike(!countLike);
  //   fetch("http://192.168.10.168:3000/places/like", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token: user.token, placeId: actualPlace._id }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         dispatch(
  //           likePlace({ placeId: actualPlace._id, username: user.username })
  //         )
  //       } 
  //     })
  // }

const allPlaces = useSelector((state) => state.allPlaces.value)
const user = useSelector((state) => state.user.value)



const likedPlaces = allPlaces.map((data,i) => {
    if (data.likes.some(e => e.username === user.username)) {
        return (
            <View key={i} style={styles.bodyContainer}>
              <Image
                source={{uri: data.photo}}
                style={{ width: 100, height: 100, marginRight: 5, borderRadius:15 }}
              />
            <View style={styles.bodyTextContainer}>
              <Text style={styles.titleCard}>{data.title}</Text>
              <Text>{data.description.slice(0,100)+'...'}</Text>
            </View>
            <View style={styles.deleteBtnContainer}>
              <TouchableOpacity style={styles.deleteBtn}>
                <FontAwesome name="trash-o" size={35} color="black" style={{marginLeft:10}} onPress={() => {handleLike()}} />
              </TouchableOpacity>
            </View>
          </View>
        )
    }
})

if(user.token) {
  return (
    <SafeAreaView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.styleHeader}>
      <Text style={styles.styleTextHeader}>MY SAVED {"\n"}PLACES</Text>
      <Image
        source={require("../assets/logoeiffel1.jpg")}
        style={{ width: 100, height: 130, borderRadius: 50 }}
      />
    </View>

<View style={styles.scrollContainer}>
<ScrollView style={styles.scrollView} stylevertical>
    {likedPlaces}
</ScrollView>

</View>

  </SafeAreaView>

  )
} else
  return (
    <SafeAreaView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.styleHeader}>
      <Text style={styles.styleTextHeader}>MY SAVED {"\n"}PLACES</Text>
      <Image
        source={require("../assets/logoeiffel1.jpg")}
        style={{ width: 100, height: 130, borderRadius: 40 }}
      />
    </View>

<View style={styles.containerJoin}>
<Text style={styles.text}> Join us and add your favorite places here!  </Text>
<TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              navigation.navigate("SignUp")
            }}
          >
            <Text style={styles.filterText}> Sign Up</Text>
          </TouchableOpacity>
</View>

  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  title: {
    color: "black",
    fontSize: 25,
  },
  titleCard:{
fontWeight:"bold",
fontSize:18

  },
  styleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:45
  },

  styleTextHeader: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Poppins_700Bold",
  },

  bodyContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 60,
    marginBottom:15,

  },

  bodyTextContainer: {
    height: 100,
    width: "65%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 20,
    paddingBottom:15,
  },

  deleteBtn: {},

  deleteBtnContainer: {
    justifyContent: "center",
    height: 100,
  },
  scrollView:{
    flexGrow:0.9

  },
  scrollContainer:{
    flex:1,
  },
  containerJoin:{
    flex:0.85,
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    padding:20,
    borderRadius:30,
    fontSize:18

  
  },
  filterBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA9774",
    width: 150,
    height: 60,
    borderRadius: 20,
    margin: 15,
  },
});
