import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import Mapa from './mapa';

export default function Alerta() {
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

  const [mapa, setMapa] = useState(false);

  if (mapa) {
    return <Mapa setMapa={setMapa} />;
  }
  return (
    <View
      style={{
        backgroundColor: '#4faeba',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        {error && <Text>Error: {error.message}</Text>}
        {information ? (
          <Text>{JSON.stringify(information[0].label['text'])}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setMapa(true)}
          style={{
            backgroundColor: '#ec8715',
            padding: '5%',
            borderRadius: 10,
            marginTop: '10%',
          }}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            Activar alerta de extravío
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
