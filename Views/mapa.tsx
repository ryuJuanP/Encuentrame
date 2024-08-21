import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 23.6345,
  longitude: -102.5528,
  latitudeDelta: 15,
  longitudeDelta: 15,
};

const icon1 = require('../assets/images/ICONO1.png');

const markers = [
  {
    id: 1,
    title: 'Marker',
    coordinate: {latitude: 23.6345, longitude: -102.5528},
    icon: icon1,
  },
];

export default function Mapa() {
  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            icon={marker.icon}
          />
        ))}
      </MapView>
    </View>
  );
}
