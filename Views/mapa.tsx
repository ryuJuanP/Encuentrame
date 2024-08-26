import axios from 'axios';
import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 23.6345,
  longitude: -102.5528,
  latitudeDelta: 15,
  longitudeDelta: 15,
};

const icon1 = require('../assets/images/ICONO1.png');

export default function Mapa() {
  const [information, setInformation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'https://encuentra-me.com/api/v1/markers/Prospektec-000-C5';

    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        setInformation(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the axios request:', error);
        setError(error);
      });
  }, []);

  // Memoriza los datos de los marcadores
  const markers = useMemo(() => {
    if (information && Array.isArray(information) && information.length > 0) {
      return information.map((item, index) => ({
        id: index,
        title: item.label?.text || 'Sin título',
        coordinate: {
          latitude: item.position?.lat || INITIAL_REGION.latitude,
          longitude: item.position?.lng || INITIAL_REGION.longitude,
        },
        icon: icon1,
      }));
    }
    return [];
  }, [information]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
