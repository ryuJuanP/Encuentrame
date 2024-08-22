import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Mapa from './mapa';

export default function Alerta() {
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
      <Text>Dispositivo: Prospektec-000-C5</Text>
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
