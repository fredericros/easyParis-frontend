import React, { useEffect, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Region } from 'react-native-maps';
import { Dimensions } from 'react-native';

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyBq886HaWXuK9TwHlP6Dc-Ze6Ur0KmdOtY';

const DirectionMapScreen = () => {
  const [region, setRegion] = useState<Region>({
    latitude: origin.latitude,
    longitude: origin.longitude,
    latitudeDelta: 0.22,
    longitudeDelta: 0.22 * (Dimensions.get('window').width / Dimensions.get('window').height),
  });

  return (
    <MapView initialRegion={region} style={{ flex: 1 }}>
      <MapViewDirections
        strokeColor="hotpink"
        onStart={(params) => {
          console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        }}
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
      />
    </MapView>
  );
};

export default DirectionMapScreen;