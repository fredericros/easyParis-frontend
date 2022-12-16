import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { Flex, Box } from "@react-native-material/core";
import { Stack, Button } from "@react-native-material/core";
import MapView, { Polygon, Marker, Callout, CustomMarker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaces } from "../reducers/places";
import ProfileScreen from "./ProfileScreen";

const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.22;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

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

export default function MapScreen({ navigation }) {

  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.value);
  const [filteredPlaces, setFilteredPlaces] = useState("district");


  // === USEEFFECT D'INITIALISATION, DEMANDE DE l'AUTORISATION DE TRACAGE GPS ===================== //

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
      }
    })();


    // === FETCH DE LA ROUTE BACKEND POUR RECUPERER LES PLACES ======================================= //

    fetch(`http://192.168.10.156:3000/places/${filteredPlaces}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadPlaces(data.places));
      });
  }, []);


  // === GESTION DE LA MODALE ====================================================================== //

  const [modalVisible, setModalVisible] = useState(false);

  const handleMarker = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  console.log(modalVisible);

  // === GESTION DES MARQUEURS ===================================================================== //

  const CustomMarker = ({ title, description }) => (
    <View>
      <View style={styles.bubble}>
        <Text style={styles.bubbleTitle}>{title}</Text>
      </View>
      <View style={styles.bubbleArrowBorder}></View>
    </View>
  );


  /*  CUSTOM MARKER WITH IMAGE
  
      const CustomMarker = ({ title, description }) => (
      <View>
        <View style = {styles.bubble}>
          <Text style = {styles.bubbleTitle}>{title}</Text>
          <Image
          style = {styles.bubbleImage}
          source={require('../assets/')}
          />
        </View>
        <View style = {styles.bubbleArrowBorder}></View>
      </View>
    );
  */

  const marker = places.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        onPress={() => {
          handleMarker();
        }}
      >
        <CustomMarker title={data.name} />
      </Marker>
    );
  });

  let Image_Http_URL = {
    uri: "https://res.cloudinary.com/dnvxs5ibr/image/upload/v1671026907/easyParis/tour-eiffel-french-moments_eutbyh.jpg",
  };



  // === GESTION DES QUARTIERS ===================================================================== //

  const districtAreas = [
    { coordinates: points, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(218, 144, 88, 0.1)" },
    { coordinates: montmartre, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: leMarais, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: latin, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: saintGermain, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: champsElysée, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: multicultural, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: historic, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: vieuxCentre, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
    { coordinates: riche, strokeWidth: 2, strokeColor: "grey", fillColor: "rgba(0, 0, 255, 0.3)" },
  ]

  const districtArea = districtAreas.map((data, i) => {
    return (
      <Polygon
        key={i}
        coordinates={data.coordinates}
        strokeWidth={data.strokeWidth}
        strokeColor={data.strokeColor}
        fillColor={data.fillColor}
      />
    )
  })


  // === RETURN ================================================================================ //

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        coverScreen={false}
        backdropOpacity={0.6}
        animationType="slide"
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ImageBackground
              source={Image_Http_URL}
              style={styles.backgroundImage}
            />
            <View style={styles.descriptionCard}>
              <Button style={styles.closeBtn} title={"close"} onPress={() => handleClose()}></Button>
            </View>
          </View>
        </View>
      </Modal>

      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 48.8584685,
          longitude: 2.3375905,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.map}
      >
        <Button style = {styles.filterBtn}></Button>
        {districtArea}
        {marker}
      </MapView>
    </View>
  );
}

// === STYLE ================================================================================= //

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
        height: "90%",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -90,
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
        height: "80%",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -40,
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
  })
  },
  backgroundImage: {
    width: "100%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  descriptionCard: {
    ...Platform.select({
      android: {
        backgroundColor: "white",
        position: "absolute",
        top: 296,
        height: "50%",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center"
      },
      ios: {
        backgroundColor: "white",
        position: "absolute",
        top: 322,
        height: "50%",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center"
      },
  })},
  closeBtn: {
    width: "30%"
  },
  modal: {
    height: 10,
  },
  bubble: {
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

  },
  filterBtn: {
    width: 150,
    height: 50,
    top:70,
    left: 40

  }
});

const mapStyle = [
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "color": "#b2d7bc"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#669372"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#e1decc"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#b6b477"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#88bcdd"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "color": "#0f4d76"
      }
    ]
  }
]
