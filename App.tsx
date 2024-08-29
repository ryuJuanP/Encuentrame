import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Alerta from './Views/alerta';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [alerta, setAlerta] = useState(false);
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña

  const handleLogin = () => {
    const baseUrl = 'https://encuentra-me.com';
    const endpoint = '/api/v1/login';
    const url = `${baseUrl}${endpoint}`;

    axios
      .post(url, {email, password})
      .then(async response => {
        console.log('POST Response:', response.data);
        setAlerta(true);
        try {
          await AsyncStorage.setItem(
            'device_id',
            response.data.marker.device_id,
          );
        } catch (error) {} // Cambia el estado para mostrar la vista de alerta
      })
      .catch(error => {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
        console.error('POST Error:', error);
      });
  };

  if (alerta) {
    return <Alerta setAlerta={setAlerta} />;
  }

  return (
    <ImageBackground
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      source={require('./assets/images/fondo.jpg')}>
      <View>
        <Image
          style={{height: 130, width: 350, marginBottom: '6%'}}
          source={require('./assets/images/Diseños/ENCUENTRA_ME_LOGO_1.png')}
        />
        <Text style={{fontSize: 18, color: 'white'}}>Correo electrónico</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            marginVertical: '4%',
            paddingHorizontal: 10,
            color: 'black',
            borderRadius: 15,
          }}
          onChangeText={text => setEmail(text)} // Actualiza el estado de correo
          value={email}
        />
        <Text style={{fontSize: 18, color: 'white'}}>Contraseña</Text>
        <TextInput
          style={{
            color: 'black',
            backgroundColor: 'white',
            marginVertical: '4%',
            paddingHorizontal: 10,
            borderRadius: 15,
          }}
          secureTextEntry
          onChangeText={text => setPassword(text)} // Actualiza el estado de contraseña
          value={password}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handleLogin} // Llama a handleLogin al presionar
            style={{
              backgroundColor: '#ec8715',
              padding: '5%',
              borderRadius: 25,
              marginTop: '5%',
              width: 250
            }}>
            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
