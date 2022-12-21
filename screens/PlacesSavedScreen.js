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
import { useEffect } from "react";
import { loadAllPlaces } from "../reducers/allPlaces";


export default function PlacesSavedScreen({ navigation }) {
    


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
              <Text>{data.description.slice(0,120)+'...'}</Text>
            </View>
            <View style={styles.deleteBtnContainer}>
              <TouchableOpacity style={styles.deleteBtn}>
                <FontAwesome name="trash" size={40} color="black" style={{marginLeft:10}} />
              </TouchableOpacity>
            </View>
          </View>
        )

    }
})

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
  back: {
    position: "absolute",
    left: 50,
    top: 50,
  },
  styleHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  styleTextHeader: {
    fontSize: 20,
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
    paddingTop:20
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

  }
});
