import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Mapa from './Views/mapa';

export default function App() {
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
      <TouchableOpacity
        onPress={() => setMapa(true)}
        style={{backgroundColor: '#ec8715', padding: '7%', borderRadius: 10}}>
        <Text style={{color: 'white', fontSize: 18}}>
          Activar alerta de extravío
        </Text>
      </TouchableOpacity>
    </View>
  );
}
