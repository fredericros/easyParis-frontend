//////////////////////////////////////    IMPORTS    ////////////////////////////////////////////

import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import * as Imagepicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useFocusEffect } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import {loadReviews} from "../reducers/reviews";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

////////////////////////////////    PROFILESCREEN FUNCTION    ////////////////////////////////////

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // === AFFICHAGE DES REVIEWS DE L'UTILISATEUR =========================================================== //

  const allReviews = useSelector((state) => state.reviews.value.allReviews);

  let reviewedPlaces;
  let reviewCount=0;

  useFocusEffect(
    React.useCallback(() => {
      fetch(`https://easy-paris-backend.vercel.app/reviews`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadReviews(data.reviews));
      });
    }, [])
  );


  if (user.token) {
    reviewedPlaces = allReviews.map((data, i) => {
      if (data.author.username === user.username) {
        let date = new Date(data.createdAt);
        let formattedDate =
          date.toLocaleDateString() +
          " - " +
          date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        reviewCount += 1
        return (
          <View key={i} style={styles.containerAboutYou}>
            <View style = {styles.reviewTitle}>
            <Text style={styles.placeTitle}>{data.place.title}</Text>
            <Text style={styles.placeTitle}>{formattedDate}</Text>
            </View>
            <Text style={styles.review}>{data.content}</Text>
          </View>
        );
    }
});
  }

  /*----------------------------------- IMAGE PICKER -----------------------------------*/

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS !== "web") {
        const { status } =
          await Imagepicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    }
    requestPermissions();

    // Vérification de l'existence de la méthode destroy et appel de cette méthode si elle existe
    return () => {
      if (Imagepicker.destroy) {
        Imagepicker.destroy();
      }
    };
  }, []);

  const PickImage = async () => {
    let result = await Imagepicker.launchImageLibraryAsync({
      mediaTypes: Imagepicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // Affiche l'image selectionné, ne pas modifier
      setImage(result.uri);
    }
  };

  /*----------------------------------- FIN IMAGE PICKER -----------------------------------*/

  const Page = () => {
    const user = useSelector((state) => state.user.value);

    if (user.token) {
      return <ProfileScreen />;
    } else {
      return <SignInScreen />;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.borderContainer}>
        <View style={styles.border}>
          {Image && <Image source={{ uri: image }} style={styles.add} />}
          {/* <Text onPress={() => navigation.navigate('SignIn')} style={styles.add} activeOpacity={0.5}>+ Add picture</Text> */}
          <Button
            title="+Add picture"
            onPress={PickImage}
            style={{ width: 200, height: 200 }}
            activeOpacity={0.5}
          >
            <Text style={styles.add}></Text>
          </Button>
        </View>

        <View style={styles.containerProfil}>
          <Text style={styles.welcome}>Welcome,</Text>
          <Text style={styles.name}>{user.username}</Text>
          <View style={styles.logoutContainer}>
            <Text
              onPress={() => {
                dispatch(logout());
                navigation.navigate("Home", { screen: "Profile" });
              }}
              style={styles.logout}
            >
              Logout
            </Text>
          </View>
        </View>

        <View style={styles.descriptionBackground}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionbutton}>Description</Text>
            <View style={styles.editButton}>
              <Text style={{ fontSize: 20 }}>Edit</Text>
            </View>
          </View>
          <TextInput style={styles.containerAboutYou} placeholder="About me" />
        </View>

        <View style={styles.reviewBackground}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionbutton}>My Reviews</Text>
            <View style={styles.editButton}>
              <Text style={{ fontSize: 20 }}>{reviewCount}</Text>
            </View>
          </View>
          <ScrollView>
          {reviewedPlaces}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

//////////////////////////////////////    STYLE    /////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    height: 140,
    width: 140,
    marginTop: 40,
    marginLeft: -10,
    marginBottom: 20,
  },

  add: {
    backgroundColor: "transparent",
    marginTop: 35,
    padding: 72,
    paddingBottom: 70,
    borderRadius: 80,
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
    color: "#1E90FF",
  },
  name: {
    justifyContent: "center",
    marginLeft: 18,
    fontSize: 30,
    color: "black",
  },
  logoutContainer: {
    ...Platform.select({
      android: {
        display: "flex",
        marginTop: 15,
        borderColor: "red",
        borderRadius: 20,
        backgroundColor: "#rgba(158, 202, 241, .4)",
      },
      ios: {
        display: "flex",
        marginTop: 15,
        borderColor: "red",
        borderRadius: 20,
        backgroundColor: "#rgba(158, 202, 241, .4)",
        paddingTop: 13,
      },
    }),
  },
  logout: {
    height: 40,
    width: 140,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 20,
    fontSize: 20,
  },
  descriptionBackground: {
    backgroundColor: "#rgba(158, 202, 241, .4)",
    marginTop: 50,
    width: "90%",
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
    width: "100%",
    display: "flex",
    height: 50,
    borderRadius: 30,
    paddingLeft: 15,
    borderWidth: 4,
    borderColor: "#1E90FF",
    marginBottom: 10,
  },
  descriptionbutton: {
    display: "flex",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "white",
    height: 50,
    width: "35%",
    borderRadius: 30,
    marginLeft: 110,
    borderWidth: 2,
    borderColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  containerAboutYou: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 10,
    width:"100%"
  },

  reviewBackground: {
    backgroundColor: "#d5d5da",
    marginTop: 10,
    width: "90%",
    height: 230,
    borderRadius: 30,
    paddingBottom: 15,

    flexWrap: "wrap",
  },
  placeTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 7
  },
  reviewTitle:{
    flexDirection: "row"

  },
  review: {},
});
