import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 20.66682,
  longitude: -103.39182,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permisos de Ubicación',
          message: 'La app necesita acceder a tu ubicación.',
          buttonNeutral: 'Mas tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const icon1 = require('../assets/images/ICONO.png');

export default function Mapa({setMapa}) {
  const [information, setInformation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleBackPress = () => {
      setMapa(); // Regresa a la vista anterior
      return true; // Indica que el evento ha sido manejado
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [setMapa]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const device_id = await AsyncStorage.getItem('device_id');
        const url = `https://encuentra-me.com/api/v1/markers/${device_id}`;
        if (device_id) {
          const response = await axios.get(url);
          console.log(response.data);
          setInformation(response.data);
        } else {
          console.error('Device ID not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
        Alert.alert('Alerta emitida correctamente.');
      }
    };

    fetchData();

    requestLocationPermission();
  }, []);

  const markers = useMemo(() => {
    if (information && Array.isArray(information) && information.length > 0) {
      return information.map((item, index) => ({
        id: index,
        title: item.label?.text || 'Sin título',
        coordinate: {
          latitude: item.position?.lat || INITIAL_REGION.latitude,
          longitude: item.position?.lng || INITIAL_REGION.longitude,
        },
        description: item.content?.beneficiary || 'Sin título',
        icon: icon1,
      }));
    }
    return [];
  }, [information]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ec8715" />
        <Text style={{color: 'white'}}>
          Enviando Alerta. Cargando ubicación en el mapa.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

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
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            icon={marker.icon}>
            <Callout
              style={{
                height: 140,
                width: 240,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ec8715',
                borderRadius: 15,
              }}>
              <View>
                <Text style={{color: 'white', fontSize: 20}}>
                  {marker.title}
                </Text>
                <Text style={{color: 'white', fontSize: 20}}>
                  {marker.description}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          height: '98%',
        }}>
        <TouchableOpacity onPress={openWhatsApp}>
          <Image
            source={require('../assets/images/whatssap.png')}
            style={{height: 90, width: 60}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4faeba',
    color: '#4faeba',
  },
});
