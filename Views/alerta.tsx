import React, {useState, useEffect, useMemo} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mapa from './mapa';

export default function Alerta() {
  const [information, setInformation] = useState(null);
  const [error, setError] = useState(null);
  const [alertId, setAlertId] = useState(null);
  const [mapa, setMapa] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const device_id = await AsyncStorage.getItem('device_id');
        if (device_id) {
          const url = `https://encuentra-me.com/api/v1/markers/${device_id}`;
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

    fetchData();
  }, []);

  useEffect(() => {
    axios;
    if (alertId) {
      const handleGetRequest = async () => {
        const requestUrl = `https://encuentra-me.com/api/v1/generateAlert/${alertId}`;
        try {
          const response = await axios.get(requestUrl);
          console.log(response.data);
        } catch (error) {
          // Alert.alert('Error', 'There was a problem fetching data.');
          // console.error('GET Error:', error ? error : error);
        }
      };

      handleGetRequest();
      setMapa(true);
    }
  }, [alertId]);
  if (mapa) {
    return <Mapa setMapa={setMapa} />;
  }

  return (
    <View
      style={{
        backgroundColor: '#4faeba',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <View style={{flexDirection: 'column', margin: 5, alignItems: 'center'}}>
        <Image
          style={{height: 150, width: 210, marginRight: '5%'}}
          source={require('../assets/images/C5.png')}
        />
        <Image
          style={{height: 60, width: 350, margin: '5%'}}
          source={require('../assets/images/logo2.png')}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          padding: '3%',
          margin: '5%',
          borderRadius: 15,
        }}>
        {error && <Text>Error: {error.message}</Text>}
        {information ? (
          <>
            <Text
              style={{
                fontSize: 26,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Montserrat-Black',
                paddingBottom: 15,
              }}>
              Dispositivo:
              {`${'\n'}${JSON.stringify(information[0]?.label?.text)}`}
            </Text>
            <Text
              style={{
                fontSize: 27,
                paddingBottom: '4%',
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
              }}>
              Beneficiario:
              {`${'\n'}${JSON.stringify(information[0]?.content?.beneficiary)}`}
            </Text>
          </>
        ) : (
          <Text
            style={{
              padding: '4%',
              fontSize: 25,
              color: 'white',
              fontFamily: 'Montserrat-Regular',
            }}>
            Cargando...
          </Text>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setAlertId('Prospecktec-000-C5')}
          style={{
            backgroundColor: '#ec8715',
            padding: '5%',
            borderRadius: 25,
            marginBottom: '10%',
            paddingHorizontal: '18%',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
              textShadowColor: 'black',
              textShadowOffset: {width: -1, height: 0},
              textShadowRadius: 10,
              fontSize: 22,
              fontWeight: '800',
            }}>
            Activar alerta de extravío
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
