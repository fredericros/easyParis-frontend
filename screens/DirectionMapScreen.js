import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { MapViewDirections, Marker } from 'react-native-maps';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DirectionMapScreen() {
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={'AIzaSyBq886HaWXuK9TwHlP6Dc-Ze6Ur0KmdOtY'} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: screenWidth,
    height: screenHeight,
  },
});