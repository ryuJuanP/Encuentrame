import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 23.6345,
  longitude: -102.5528,
  latitudeDelta: 15,
  longitudeDelta: 15,
};

const icon1 = require('../assets/images/ICONO.png');

export default function Mapa() {
  const [information, setInformation] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const url = 'https://encuentra-me.com/api/v1/markers/Prospektec-000-C5';

  // Memoriza los datos de los marcadores

  const fetchData = async () => {
    try {
      const device_id = await AsyncStorage.getItem('device_id');
      const url = `https://encuentra-me.com/api/v1/markers/${device_id}`;
      if (device_id) {
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

        const response = await axios.get(url);
        console.log(response.data);
        setInformation(response.data);
      } else {
        console.error('Device ID not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  };

  fetchData(), [];
  const markers = useMemo(() => {
    if (information && Array.isArray(information) && information.length > 0) {
      return information.map((item, index) => ({
        id: index,
        title: item.label?.text || 'Sin título',
        coordinate: {
          latitude: item.position?.lat || INITIAL_REGION.latitude,
          longitude: item.position?.lng || INITIAL_REGION.longitude,
        },
        description: item.content?.beneficiary || 'Sin titulo',
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

  // whatssap Button
  const openWhatsApp = () => {
    const phoneNumber = '+1234567890'; // Reemplaza con el número de teléfono
    const message = 'Hola, necesito ayuda con la ubicación.';

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            'WhatsApp no está instalado',
            'Parece que no tienes WhatsApp instalado en tu dispositivo.',
          );
        }
      })
      .catch(err => console.error('Error al abrir WhatsApp:', err));
  };

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
            description={marker.description}
            icon={marker.icon}>
            <Callout>
              <View
                style={{
                  height: 70,
                  width: 200,
                  alignItems: 'center',
                  padding: '5%',
                }}>
                <Text style={{color: 'black'}}>{marker.title}</Text>
                <Text style={{color: 'black'}}>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={{alignItems: 'flex-start', justifyContent:'flex-end', height:'100%'}}>
        <TouchableOpacity onPress={openWhatsApp}>
          <Image
            source={require('../assets/images/whatssap.png')}
            style={{height: 90, width: 90}}
          />
        </TouchableOpacity>
      </View>
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
