import React, { useState } from 'react';
import MapView, { Polygon, Marker, Callout, CustomMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Text, StyleSheet} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.22;
const LONGITUDE_DELTA = LATITUDE_DELTA * (screenWidth / screenHeight);
import { Dimensions } from 'react-native';
import { useEffect } from 'react';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DirectionMapScreen ({navigation}) {
const [distance, setDistance] = useState('')
const [duration, setDuration] = useState('')

const formattedDistance = distance.slice(0, 13);
const formattedDuration = duration.slice(0, 12);

const [state, setState] = useState({
  pickUpCords :{
    latitude: 48.858370,
    longitude: 2.294481,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,

  },
dropLocationCors:{
  latitude: 48.852968,
    longitude: 2.349902,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
})

const {pickUpCords, dropLocationCors} = state
const GOOGLE_MAPS_APIKEY = 'AIzaSyBq886HaWXuK9TwHlP6Dc-Ze6Ur0KmdOtY'
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
      }
    })();
  }, []);


  return (
    <View style={styles.container}>
       <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{ latitude: 48.858370, longitude: 2.294481,
          latitudeDelta: 48.852968,
          longitudeDelta: 2.349902,}}
        style={styles.map}
      >
        <Marker coordinate={{ latitude: 48.858370, longitude: 2.294481 }}></Marker>
        <Marker coordinate={{ latitude: 48.852968, longitude: 2.349902 }}></Marker>
        <MapViewDirections
    origin={pickUpCords}
    destination={dropLocationCors}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="red"
    optimizeWaypoints={true}
    mode='WALKING'
    onStart={(params) => {
      console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
    }}
    onReady={result => {
      setDistance(`Distance: ${result.distance} km`)
      setDuration(`Duration: ${result.duration} min.`)
    }}
    onError={(errorMessage) => {
      // console.log('GOT AN ERROR');
    }}
  />
      </MapView>
      <View style={styles.textPart}>
        <Text style={styles.textStyle}>{formattedDistance} km</Text>
        <Text style={styles.textStyle}>{formattedDuration} min</Text>
        </View>
     
    </View>

  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
   
  },
  map: {
    flex: 1,
  },

  textPart:{
    position: 'absolute',
    top: 100,
    left: 90,
    right: 0,
    bottom: 0,
alignItems: 'center',
borderRadius: 50,
backgroundColor: 'white',
width: 200,
height: 100,
justifyContent: 'center',


  },

  textStyle: {
    fontSize: 20,

  }
})

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