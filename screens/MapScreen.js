//////////////////////////////////////    IMPORTS    //////////////////////////////////////////

import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Alert,
  Linking,
  Dimensions
} from "react-native";

import MapView, {
  Polygon,
  Marker,
  // Callout,
  // CustomMarker,
  // PROVIDER_GOOGLE,
} from "react-native-maps";

import { useDispatch, useSelector } from "react-redux";
import {
  loadActualPlace,
  likeActualPlace,
  reviewActualPlace,
} from "../reducers/actualPlaces";
import { 
  loadAllPlaces, 
  likePlace, 
  reviewPlace } from "../reducers/allPlaces";
import {
  deleteReview,
  loadMyReview,
  deleteMyReview,
} from "../reducers/reviews";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const LATITUDE_DELTA = 0.22;
const LONGITUDE_DELTA = LATITUDE_DELTA * (screenWidth / screenHeight);


///////////////////////////////////   MAPSCREEN FUNCTION   /////////////////////////////////////

export default function MapScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const allPlaces = useSelector((state) => state.allPlaces.value);
  const actualPlace = useSelector((state) => state.actualPlaces.value);
  const myReview = useSelector((state) => state.reviews.value.myReview);

  const [districtVisible, setDistrictVisible] = useState(true);
  const [postReview, setPostReview] = useState("");

  // === FETCH DE LA ROUTE BACKEND POUR RECUPERER LES PLACES A L'INITILAISATION =========================================================== //

  useFocusEffect(
    React.useCallback(() => {
      fetch(`https://easy-paris-backend.vercel.app/places/district`)
        .then((response) => response.json())
        .then((data) => {
          data.result && dispatch(loadAllPlaces(data.places));
        });
      setDistrictVisible(true);
    }, [])
  );

  // === FETCH DE LA ROUTE BACKEND POUR RECUPERER LES PLACESFILTREES AU CLICK SUR UN BOUTON FILTRE ======================================= //

  const handleFilter = (filter) => {
    fetch(`https://easy-paris-backend.vercel.app/places/${filter}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadAllPlaces(data.places));
      });
  };

  // === GESTION DES MARQUEURS ============================================================================================================ //

  // CUSTOM MARKER FOR DISTRICTS (NO PHOTO)

  const CustomMarker = ({ title }) => (
    <View>
      <View style={styles.bubbleCategory}>
        <Text style={styles.bubbleTitle}>{title}</Text>
      </View>
      <View style={styles.bubbleArrowBorder}></View>
    </View>
  );

  const districtMarker = allPlaces.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        onPress={() => {
          dispatch(loadActualPlace(data));
          handleMarker();
        }}
      >
        <CustomMarker title={data.title} />
      </Marker>
    );
  });

  // CUSTOM MARKER FOR PLACES (WITH PHOTO)

  const CustomImgMarker = ({ title, image }) => (
    <View>
      <View style={styles.bubble}>
        <Image style={styles.bubbleImage} source={{ uri: image }} />
        <View style={styles.textMarker}>
          <Text style={styles.bubbleTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.bubbleArrowBorder}></View>
    </View>
  );

  const placeMarker = allPlaces.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        onPress={() => {
          dispatch(loadActualPlace(data))
          const index = data.reviews.findIndex((e) => e.author.username === user.username);
          dispatch(loadMyReview(data.reviews[index]));
          handleMarker();
        }}
      >
        <CustomImgMarker title={data.title} image={data.photo} />
      </Marker>
    );
  });

  // === GESTION DE LA MODALE ========================================================================================================= //

  const [modalVisible, setModalVisible] = useState(false);

  const handleMarker = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const modal = () => {
    if (districtVisible) {
      return (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          style={styles.modal}
          // coverScreen={false}
          // backdropOpacity={0.6}
          // onBackdropPress={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                source={actualPlace && { uri: actualPlace.photo }}
                style={styles.backgroundImage}
              ></ImageBackground>

              <View style={styles.descriptionCard}>
                <TouchableOpacity></TouchableOpacity>
                <FontAwesome
                  aria-hidden="true"
                  name="times-circle-o"
                  size={40}
                  color="black"
                  onPress={() => handleClose()}
                  style={styles.closeBtn}
                />
                {/* here we will need to add a map to add costom name */}
                <Text style={styles.cardTittle}>
                  {actualPlace && actualPlace.title}
                </Text>
                {/* This is for the text about the place = alsi needs mao */}
                <Text style={styles.cardText}>
                  {actualPlace && actualPlace.description}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      );
    } else {
      return (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          style={styles.modal}
        >
          <Swiper
            loop={false}
            style={styles.wrapper}
            paginationStyle={{
              bottom: 0,
              left: 0,
              top: screenHeight * 0.86,
              right: 0,
            }}
            containerStyle={{ height: 150, flex: 1 }}
          >
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={actualPlace && { uri: actualPlace.photo }}
                  style={styles.backgroundImage}
                ></ImageBackground>

                <View style={styles.descriptionCard}>
                  <TouchableOpacity></TouchableOpacity>
                  <FontAwesome
                    aria-hidden="true"
                    name="times-circle-o"
                    size={40}
                    color="black"
                    onPress={() => handleClose()}
                    style={styles.closeBtn}
                  />
                  <Text style={styles.cardTittle}>
                    {actualPlace && actualPlace.title}
                  </Text>
                  <Text style={styles.cardText}>
                    {actualPlace && actualPlace.description}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleLike()}
                    style={styles.heartBtn}
                  >
                    <FontAwesome style={likeStyle} name="heart" size={30} />
                  </TouchableOpacity>
                  <View style={styles.heartCounter}>
                    <Text style={styles.heartCounterText}>
                      {actualPlace && actualPlace.likes.length}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.goBtn}
                    onPress={() => {
                      navigation.navigate("DirectionMapScreen");
                      handleClose();
                    }}
                  >
                    <FontAwesome
                      name="location-arrow"
                      size={40}
                      color="#1E90FF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>

            <SafeAreaView style={styles.slide2centeredView}>
              <View style={styles.slide2modalView}>
                <View style={styles.cardInfoMaintTitleBLock}>
                  <Text style={styles.cardInfoMaintTitle}>INFORMATION</Text>
                </View>
                <FontAwesome
                  aria-hidden="true"
                  name="times-circle-o"
                  size={40}
                  color="black"
                  onPress={() => handleClose()}
                  style={styles.closeBtnSlide2}
                />
                <View style={styles.cardInfoOpeningHours}>
                  <Text style={styles.cardInfoTitle}>⏱ Opening Hours</Text>
                  {cardHours}
                </View>
                <View style={styles.cardInfoTickets}>
                  <Text style={styles.cardInfoTitle}>
                    🎟️ Tickets and Prices
                  </Text>
                  {cardPrices}
                </View>
                <View style={styles.cardInfoTips}>
                  <Text style={styles.cardInfoTitle}>✅ Tips</Text>
                  {cardTips}
                </View>

                <TouchableOpacity
                  style={styles.cardInfoBtn}
                  onPress={() => {
                    {
                      actualPlace && Linking.openURL(actualPlace.website);
                    }
                  }}
                >
                  <Text>GO TO WEBSITE</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.slide2centeredView}
            >
              <SafeAreaView style={styles.slide3modalView}>
                <View>
                  <Text style={styles.slide3Tittle}>REVIEWS</Text>
                </View>

                <ScrollView vertical style={styles.scrollUsersReview}>
                  {reviewsPlace}
                </ScrollView>
                <FontAwesome
                  aria-hidden="true"
                  name="times-circle-o"
                  size={40}
                  color="black"
                  onPress={() => handleClose()}
                  style={styles.closeBtnSlide2}
                />
                {submitReview()}
              </SafeAreaView>
            </KeyboardAvoidingView>
          </Swiper>
        </Modal>
      );
    }
  };

    // === GESTION DES INFOS (TABLEAUX) DE LA MODALE ============================================================================================ //

    let cardHours;
    let cardPrices;
    let cardTips;
    let reviewsPlace;
  
    if (actualPlace) {
      cardHours = actualPlace.hours.map((data, i) => {
        return (
          <Text key={i} numberOfLines={2} style={styles.cardInfoText}>
            {data}
          </Text>
        );
      });
  
      cardPrices = actualPlace.priceRange.map((data, i) => {
        return (
          <Text key={i} numberOfLines={2} style={styles.cardInfoText}>
            {data}
          </Text>
        );
      });
  
      cardTips = actualPlace.tips.map((data, i) => {
        return (
          <Text key={i} numberOfLines={2} style={styles.cardInfoText}>
            {data}
          </Text>
        );
      });
  
      reviewsPlace = actualPlace.reviews.map((data, i) => {
          let date = new Date(data.createdAt);
          let formattedDate =
            date.toLocaleDateString() +
            " " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return (
            <View key={i}>
              <View style={styles.slide3User}>
                <Text style={styles.slide3UserName}>{data.author.username}</Text>
                <Text style={styles.slide3Date}>{formattedDate}</Text>
              </View>
              <View>
                <Text style={styles.slide3Description}>{data.content}</Text>
              </View>
            </View>
          );
    
      });}


  // === GESTION DES LIKES =========================================================================================================== //

   // LIKER UN LIEU //

  const handleLike = () => {
    fetch("https://easy-paris-backend.vercel.app/places/like", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, placeId: actualPlace._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            likePlace({ placeId: actualPlace._id, username: user.username })
          );
          dispatch(likeActualPlace({ username: user.username }));
        } else {
          Alert.alert(
            "Want to save this place?",
            "Create your account or sign in!",
            [
              {
                text: "Cancel",
              },
              {
                text: "Sign In",
                onPress: () => {
                  setModalVisible(false);
                  navigation.navigate("Home", { screen: "Profile" });
                },
              },
            ]
          );
        }
      });
  };


  // CHANGER LE STYLE DE L'ICONE EN FONCTION DU LIKE //

  let likeStyle = {};
  if (
    actualPlace &&
    actualPlace.likes.some((e) => e.username === user.username)
  ) {
    likeStyle = { color: "#f91980" };
  }


  // === GESTION DES REVIEWS ============================================================================================================= //

  // POSTER UNE REVIEW //

  const handleSubmitReview = () => {
    if (user.token) {
      fetch("https://easy-paris-backend.vercel.app/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          placeId: actualPlace._id,
          content: postReview,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(loadMyReview(data.newReview)); // Dispatch the review in reviews => My review (to display it in the My review field)
            dispatch(reviewActualPlace({ username: user.username, content: data.newReview.content, createdAt: data.newReview.createdAt })); // Dispatch the username in the "reviews" array of actualPlace (in order to display the edit view (rather than the input view) in the reviews tile of the place Card, when a review has been submitted)
            dispatch(
              reviewPlace({ placeId: actualPlace._id, username: user.username, content: data.newReview.content, createdAt: data.newReview.createdAt })
            ); // Dispatch the username in the "reviews" array of the concerned place in AllPlaces (in order to display the edit view (rather than the input view) in the reviews tile, after closing and reopening the place Card)
            setPostReview("");
          } else {
            console.log(data.error);
          }
        });
    } else {
      Alert.alert(
        "Want to review this place?",
        "Create your account or sign in!",
        [
          {
            text: "Cancel",
          },
          {
            text: "Sign In",
            onPress: () => {
              setModalVisible(false);
              navigation.navigate("Home", { screen: "Profile" });
            },
          },
        ]
      );
      setPostReview("");
    }
  };

  // SUPPRIMER UNE REVIEW //

  const handleDeleteReview = () => {
    fetch("https://easy-paris-backend.vercel.app/reviews/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        placeId: actualPlace._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteReview({ placeId: actualPlace._id, username: user.username })); // Delete the review in the reviews => allReviews store (in order to delete it from the main container that displays all the reviews)
          dispatch(deleteMyReview()); // Delete the review in the reviews => myReview store (in order to delete it from the "My review" container)
          dispatch(reviewActualPlace({ username: user.username })); // Delete the username in the "reviews" array of actualPlace (in order to display the input view (rather than the edit view) in the reviews tile of the place Card, when a review has been deleted)
          dispatch(
            reviewPlace({ placeId: actualPlace._id, username: user.username })
          ); // Delete the username in the "reviews" array of the concerned place in AllPlaces (in order to display the input view (rather than the edit view) in the reviews tile, after closing and reopening the place Card)
        }
      });
  };

  // AFFICHAGE LORSQUE AUCUNE REVIEW N'A ETE POSTEE (CHAMPS INPUT DE SAISIE) //

  const addNewReview = (
    <View style={styles.inputContainer}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add a review"
          placeholderTextColor="#66757F"
          maxLength={150}
          multiline={true}
          onChangeText={(value) => setPostReview(value)}
          value={postReview}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButtonReview}
        onPress={() => handleSubmitReview()}
      >
        <Text style={styles.textBtnSubnit}>Post review</Text>
        <FontAwesome name="paper-plane" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );

  // AFFICHAGE LORSQU'UNE REVIEW A ETE POSTEE (CHAMPS D'AFFICHAGE + BOUTON EDIT ET DELETE) //

  const postedReview = (
    <View style={styles.inputContainer}>
      <Text style={styles.slide3UserName}>My Review</Text>
      <View style={styles.myReviewContainer}>
        <Text>{myReview && myReview.content}</Text>
      </View>
      <TouchableOpacity style={styles.editBtn}>
        <FontAwesome name="edit" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDeleteReview()}
      >
        <FontAwesome name="trash-o" size={25} />
      </TouchableOpacity>
    </View>
  );

  // FONCTION POUR CONDITIONNER L'AFFICHAGE //

  let submitReview = () => {
    if (
      actualPlace &&
      user.token &&
      actualPlace.reviews.some((e) => e.author.username === user.username)
    ) {
      return postedReview;
    } else {
      return addNewReview;
    }
  };

  

  // === GESTION DES QUARTIERS ===================================================================== //

  const districtAreas = [
    {
      coordinates: points,
      strokeWidth: 2,
      strokeColor: "grey",
      fillColor: "rgba(218, 144, 88, 0.1)",
    },
    {
      coordinates: montmartre,
      strokeWidth: 2,
      strokeColor: "rgba(247, 37, 133, 0.4)",
      fillColor: "rgba(247, 37, 133, 0.3)",
    },
    {
      coordinates: leMarais,
      strokeWidth: 2,
      strokeColor: "rgba(224, 10, 153, 0.4)",
      fillColor: "rgba(224, 10, 153, 0.3)",
    },
    {
      coordinates: latin,
      strokeWidth: 2,
      strokeColor: "rgba(83, 193, 132, 0.4)",
      fillColor: "rgba(83, 193, 132, 0.3)",
    },
    {
      coordinates: saintGermain,
      strokeWidth: 2,
      strokeColor: "rgba(224, 37, 49, 0.4)",
      fillColor: "rgba(224, 37, 49, 0.3)",
    },
    {
      coordinates: champsElysée,
      strokeWidth: 2,
      strokeColor: "rgba(253, 218, 104, 0.4)",
      fillColor: "rgba(253, 218, 104, 0.3)",
    },
    {
      coordinates: multicultural,
      strokeWidth: 2,
      strokeColor: "rgba(0, 0, 255, 0.4)",
      fillColor: "rgba(0, 0, 255, 0.3)",
    },
    {
      coordinates: historic,
      strokeWidth: 2,
      strokeColor: "rgba(57, 91, 219, 0.4)",
      fillColor: "rgba(57, 91, 219, 0.3)",
    },
    {
      coordinates: vieuxCentre,
      strokeWidth: 2,
      strokeColor: "rgba(239, 163, 16, 0.4)",
      fillColor: "rgba(239, 163, 16, 0.3)",
    },
    {
      coordinates: riche,
      strokeWidth: 2,
      strokeColor: "rgba(234, 151, 116, 0.4)",
      fillColor: "rgba(234, 151, 116, 0.3)",
    },
  ];

  const districtArea = districtAreas.map((data, i) => {
    return (
      <Polygon
        key={i}
        coordinates={data.coordinates}
        strokeWidth={data.strokeWidth}
        strokeColor={data.strokeColor}
        fillColor={data.fillColor}
      />
    );
  });

  // === RETURN =========================================================================================================================== //

  return (
    <View style={styles.container}>
      {modal()}

      <View style={styles.filterContainer}>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              handleFilter("district");
              setDistrictVisible(true);
            }}
          >
            <Text style={styles.filterText}>🗺️ Disctricts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              handleFilter("monuments");
              setDistrictVisible(false);
            }}
          >
            <Text style={styles.filterText}>🏰 Monuments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              handleFilter("gardens");
              setDistrictVisible(false);
            }}
          >
            <Text style={styles.filterText}>🌺 Gardens</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>🕍 Churches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>👽 Secret places</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <MapView
        // provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 48.8584685,
          longitude: 2.3375905,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.map}
      >
        {districtArea}
        {districtVisible ? districtMarker : placeMarker}
      </MapView>
    </View>
  );
}

//////////////////////////////////////    STYLE    /////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    ...Platform.select({
      android: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      ios: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    }),
  },
  backgroundImage: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  descriptionCard: {
    ...Platform.select({
      android: {
        top: screenHeight * 0.34,
        height: screenHeight * 0.4,
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
      },
      ios: {
        top: screenHeight * 0.4,
        height: screenHeight * 0.4,
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
      },
    }),
  },
  closeBtn: {
    ...Platform.select({
      android: {
        width: "30%",
        position: "absolute",
        bottom: screenHeight * 0.67,
        left: screenWidth * 0.77,
      },
      ios: {
        width: "30%",
        position: "absolute",
        bottom: screenHeight * 0.74,
        left: screenWidth * 0.77,
      },
    }),
  },
  modal: {
    height: 10,
  },

  bubbleCategory: {
    opacity: 0.92,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderColor: "#fff",
    borderWidth: 0.5,
    padding: 10,
    width: 110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  bubble: {
    opacity: 0.92,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 215,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textMarker: {
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bubbleArrowBorder: {
    opacity: 0.92,
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bubbleImage: {
    alignSelf: "center",
    height: 60,
    width: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  filterContainer: {
    flex: 0.2,
  },
  scrollView: {
    backgroundColor: "pink",
  },
  filterBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA9774",
    width: 150,
    height: 60,
    top: 50,
    borderRadius: 20,
    margin: 15,
  },
  filterText: {
    color: "white",
    fontWeight: "bold",
  },
  cardTittle: {
    fontSize: 30,
    lineHeight: 35,
    paddingTop: 40,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    width: "85%",
  },

  cardText: {
    fontWeight: "300",
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
    fontSize: 18,
    width: "85%",
    textAlign: "left",
  },
  heartBtn: {
    position: "absolute",
    bottom: screenHeight * 0.37,
    left: screenWidth * 0.7,
    backgroundColor: "white",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  heartCounter: {
    position: "absolute",
    bottom: screenHeight * 0.355,
    left: screenWidth * 0.79,
    backgroundColor: "white",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  heartCounterText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  goBtn: {
    position: "absolute",
    bottom: screenHeight * 0.37,
    left: screenWidth * 0.52,
    backgroundColor: "white",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  wrapper: {
    height: screenHeight * 1,
  },

  slide2centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2modalView: {
    ...Platform.select({
      android: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      ios: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    }),
  },

  cardInfoTitle: {
    flex: 1,
    flexWrap: "wrap",
    lineHeight: 33,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },

  cardInfoText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    width: 330,
    height: screenHeight * 0.04,
    textAlign: "center",
    justifyContent: "space-evenly",
  },

  cardInfoMaintTitle: {
    marginTop: screenHeight * 0.05,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Poppins_700Bold",
  },

  cardInfoMaintTitleBLock: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
    height: "13%",
  },

  cardInfoOpeningHours: {
    height: screenHeight * 0.2,
  },

  cardInfoTickets: {
    height: screenHeight * 0.2,
  },

  cardInfoTips: {
    height: screenHeight * 0.25,
  },

  cardInfoBtn: {
    borderBottomColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    width: screenWidth * 0.6,
    height: screenHeight * 0.06,
    padding: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },

  slide3Tittle: {
    marginTop: screenHeight * 0.05,
    alignContent: "center",
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Poppins_700Bold",
  },

  slide3modalView: {
    ...Platform.select({
      android: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      ios: {
        height: screenHeight * 0.9,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    }),
  },

  slide3UserName: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "baseline",
    paddingRight: 10,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },

  slide3Date: {
    paddingTop: 15,
    alignItems: "baseline",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },

  slide3Description: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },

  scrollUsersReview: {
    flexGrow: 0.6,
  },

  input: {
    backgroundColor: "#e9f2ff",
    paddingBottom: 10,
    height: 110,
    width: 300,
    margin: 32,
    padding: 20,
    borderRadius: 25,
    fontSize: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  inputContainer: {
    position: "absolute",
    top: screenHeight * 0.6,
    bottom: 0,
    right: 0,
    left: 0,
    height: "25%",
    alignItems: "center",
  },
  submitButtonReview: {
    borderBottomColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    width: screenWidth * 0.6,
    height: screenHeight * 0.06,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    position: "absolute",
    top: screenHeight * 0.19,
  },

  textBtnSubnit: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    paddingRight: 20,
  },

  myReviewContainer: {
    backgroundColor: "#e9f2ff",
    paddingBottom: 10,
    height: 110,
    width: 300,
    padding: 20,
    borderRadius: 25,
    fontSize: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  editBtn: {
    position: "absolute",
    bottom: screenHeight * 0.02,
    left: screenWidth * 0.55,
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  deleteBtn: {
    position: "absolute",
    bottom: screenHeight * 0.02,
    left: screenWidth * 0.7,
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  closeBtnSlide2: {
    width: "30%",
    position: "absolute",
    bottom: screenHeight * 0.82,
    left: screenWidth * 0.77,
  },

  viewBlock: {
    paddingLeft: 15,
    paddingRight: 15,
  },

  slide3User: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const mapStyle = [
  {
    featureType: "administrative",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "landscape.natural.landcover",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        color: "#b2d7bc",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        color: "#669372",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        color: "#e1decc",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#b6b477",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#88bcdd",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        color: "#0f4d76",
      },
    ],
  },
];

const points = [
  { latitude: 48.834113, longitude: 2.272863 },
  { latitude: 48.816533, longitude: 2.335649 },
  { latitude: 48.817008, longitude: 2.352248 },
  { latitude: 48.815709, longitude: 2.360645 },
  { latitude: 48.834621, longitude: 2.412387 },
  { latitude: 48.879761, longitude: 2.411992 },
  { latitude: 48.902327, longitude: 2.389639 },
  { latitude: 48.90125, longitude: 2.320262 },
  { latitude: 48.878158, longitude: 2.277284 },
  { latitude: 48.880519, longitude: 2.258463 },
  { latitude: 48.873947, longitude: 2.255067 },
  { latitude: 48.876563, longitude: 2.245657 },
  { latitude: 48.866353, longitude: 2.230134 },
  { latitude: 48.8488, longitude: 2.225283 },
  { latitude: 48.845288, longitude: 2.251963 },
  { latitude: 48.834753, longitude: 2.255067 },
  { latitude: 48.834113, longitude: 2.272863 },
  /*
      { latitude: 48.851223, longitude: 2.278727 },
      { latitude: 48.862143, longitude: 2.292968 },
      { latitude: 48.864611, longitude: 2.310069},
      { latitude: 48.857014, longitude: 2.309773 },
      { latitude: 48.843701, longitude: 2.292996 },
      { latitude: 48.851223, longitude: 2.278727 },
      */
];
const points1 = [
  { latitude: 48.864611, longitude: 2.310069 },
  { latitude: 48.857014, longitude: 2.309773 },
  { latitude: 48.843701, longitude: 2.292996 },
  { latitude: 48.845137, longitude: 2.310914 },
  { latitude: 48.851666, longitude: 2.327382 },
  { latitude: 48.860363, longitude: 2.333381 },
  { latitude: 48.864611, longitude: 2.310069 },
];
const montmartre = [
  { latitude: 48.887434, longitude: 2.337277 },
  { latitude: 48.883202, longitude: 2.336204 },
  { latitude: 48.882059, longitude: 2.340602 },
  { latitude: 48.883344, longitude: 2.347104 },
  { latitude: 48.8891, longitude: 2.344851 },
  { latitude: 48.887435, longitude: 2.337255 },
  { latitude: 48.887434, longitude: 2.337277 },
];

const leMarais = [
  { latitude: 48.855833, longitude: 2.351638 },
  { latitude: 48.863028, longitude: 2.361682 },
  { latitude: 48.861023, longitude: 2.366703 },
  { latitude: 48.852948, longitude: 2.363699 },
  { latitude: 48.8558, longitude: 2.35164 },
  { latitude: 48.855833, longitude: 2.351638 },
];

const latin = [
  { latitude: 48.8558209, longitude: 2.3404383 },
  { latitude: 48.8527712, longitude: 2.33752 },
  { latitude: 48.8502297, longitude: 2.3422836 },
  { latitude: 48.8481117, longitude: 2.3418974 },
  { latitude: 48.846276, longitude: 2.343099 },
  { latitude: 48.8432541, longitude: 2.3463177 },
  { latitude: 48.8414747, longitude: 2.3482488 },
  { latitude: 48.8411358, longitude: 2.3520254 },
  { latitude: 48.8457677, longitude: 2.3530983 },
  { latitude: 48.8485353, longitude: 2.3505663 },
  { latitude: 48.8505686, longitude: 2.3494076 },
  { latitude: 48.8522912, longitude: 2.3485922 },
  { latitude: 48.8559338, longitude: 2.3405241 },
  { latitude: 48.8558209, longitude: 2.3404383 },
];

const saintGermain = [
  { latitude: 48.852479, longitude: 2.3392007 },
  { latitude: 48.8555852, longitude: 2.3346517 },
  { latitude: 48.8561499, longitude: 2.3315618 },
  { latitude: 48.856997, longitude: 2.3280428 },
  { latitude: 48.8558393, longitude: 2.3255966 },
  { latitude: 48.8512083, longitude: 2.3266266 },
  { latitude: 48.8476218, longitude: 2.3276994 },
  { latitude: 48.8453625, longitude: 2.3316476 },
  { latitude: 48.8427359, longitude: 2.334523 },
  { latitude: 48.8440068, longitude: 2.3388574 },
  { latitude: 48.846944, longitude: 2.3403595 },
  { latitude: 48.8490903, longitude: 2.3388145 },
  { latitude: 48.8508977, longitude: 2.33757 },
  { latitude: 48.8524226, longitude: 2.3391149 },
  { latitude: 48.852479, longitude: 2.3392007 },
];
const champsElysée = [
  { latitude: 48.8730029, longitude: 2.295404 },
  { latitude: 48.86476, longitude: 2.3002105 },
  { latitude: 48.8643083, longitude: 2.3097377 },
  { latitude: 48.8689945, longitude: 2.3102527 },
  { latitude: 48.8737932, longitude: 2.3102527 },
  { latitude: 48.8748658, longitude: 2.309566 },
  { latitude: 48.8786479, longitude: 2.3039012 },
  { latitude: 48.8781399, longitude: 2.2981505 },
  { latitude: 48.8768415, longitude: 2.2920566 },
  { latitude: 48.8753174, longitude: 2.2900825 },
  { latitude: 48.8730029, longitude: 2.2949748 },
  { latitude: 48.8730029, longitude: 2.295404 },
];

const multicultural = [
  { latitude: 48.883755, longitude: 2.3492929 },
  { latitude: 48.8978069, longitude: 2.3547002 },
  { latitude: 48.8986533, longitude: 2.3817369 },
  { latitude: 48.8919947, longitude: 2.3952123 },
  { latitude: 48.882739, longitude: 2.3981306 },
  { latitude: 48.8759655, longitude: 2.4078294 },
  { latitude: 48.8650853, longitude: 2.4084514 },
  { latitude: 48.8666662, longitude: 2.3839038 },
  { latitude: 48.8816825, longitude: 2.3712008 },
  { latitude: 48.8841659, longitude: 2.3669093 },
  { latitude: 48.8838273, longitude: 2.3495715 },
  { latitude: 48.883755, longitude: 2.3492929 },
];

const historic = [
  { latitude: 48.8568921, longitude: 2.2925149 },
  { latitude: 48.8609579, longitude: 2.2875367 },
  { latitude: 48.8633859, longitude: 2.2918282 },
  { latitude: 48.8649104, longitude: 2.3003255 },
  { latitude: 48.8642893, longitude: 2.3068486 },
  { latitude: 48.8646845, longitude: 2.3113118 },
  { latitude: 48.8646281, longitude: 2.3151742 },
  { latitude: 48.8667172, longitude: 2.3160325 },
  { latitude: 48.8663784, longitude: 2.3192941 },
  { latitude: 48.8666607, longitude: 2.3216115 },
  { latitude: 48.8656444, longitude: 2.3261605 },
  { latitude: 48.864007, longitude: 2.3315679 },
  { latitude: 48.8629342, longitude: 2.3343144 },
  { latitude: 48.8606623, longitude: 2.3406029 },
  { latitude: 48.8587988, longitude: 2.3394871 },
  { latitude: 48.8575565, longitude: 2.3367405 },
  { latitude: 48.8579518, longitude: 2.3330498 },
  { latitude: 48.858573, longitude: 2.3296165 },
  { latitude: 48.8591376, longitude: 2.3267841 },
  { latitude: 48.8603235, longitude: 2.3231792 },
  { latitude: 48.8617352, longitude: 2.3204327 },
  { latitude: 48.8624127, longitude: 2.3155403 },
  { latitude: 48.8542246, longitude: 2.3153687 },
  { latitude: 48.8530951, longitude: 2.3150253 },
  { latitude: 48.8537728, longitude: 2.3063564 },
  { latitude: 48.8511749, longitude: 2.3019791 },
  { latitude: 48.85654, longitude: 2.292881 },
  { latitude: 48.8568921, longitude: 2.2925149 },
];

const vieuxCentre = [
  { latitude: 48.8572177, longitude: 2.3383713 },
  { latitude: 48.8587988, longitude: 2.3400021 },
  { latitude: 48.8573306, longitude: 2.3463535 },
  { latitude: 48.855467, longitude: 2.3522758 },
  { latitude: 48.8532645, longitude: 2.3578548 },
  { latitude: 48.8514008, longitude: 2.3616314 },
  { latitude: 48.8491981, longitude: 2.3614597 },
  { latitude: 48.8487463, longitude: 2.3581982 },
  { latitude: 48.8501583, longitude: 2.3539066 },
  { latitude: 48.8525303, longitude: 2.3477268 },
  { latitude: 48.8539987, longitude: 2.3442936 },
  { latitude: 48.8557494, longitude: 2.3411179 },
  { latitude: 48.8571047, longitude: 2.3385429 },
  { latitude: 48.8572177, longitude: 2.3383713 },
];

const riche = [
  { latitude: 48.8630096, longitude: 2.2873359 },
  { latitude: 48.8725512, longitude: 2.294374 },
  { latitude: 48.8758819, longitude: 2.2843318 },
  { latitude: 48.8714221, longitude: 2.2752338 },
  { latitude: 48.8648729, longitude: 2.2719722 },
  { latitude: 48.8628402, longitude: 2.2688823 },
  { latitude: 48.8579275, longitude: 2.2683673 },
  { latitude: 48.854991, longitude: 2.2696548 },
  { latitude: 48.8524496, longitude: 2.2796111 },
  { latitude: 48.8630096, longitude: 2.2875934 },
  { latitude: 48.8630096, longitude: 2.2873359 },
];
