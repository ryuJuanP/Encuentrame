import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Alerta from './Views/alerta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

export default function App() {
  const [alerta, setAlerta] = useState(false);
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
  //       if (loggedInStatus === 'true') {
  //         setIsLoggedIn(true);
  //       }
  //     } catch (error) {
  //       console.error('Error checking login status:', error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const handleLogin = () => {
    const baseUrl = 'https://encuentra-me.com';
    const endpoint = '/api/v1/login';
    const url = `${baseUrl}${endpoint}`;
    setLoading(true);
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
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } catch (error) {
        } finally {
          setLoading(false); // Desactiva el estado de carga
        } // Cambia el estado para mostrar la vista de alerta
      })
      .catch(error => {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
        console.error('POST Error:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ec8715" />
        <Text style={{color: 'white'}}>Iniciando sesión</Text>
      </View>
    );
  }

  if (alerta) {
    return <Alerta setAlerta={setAlerta} />;
  }

  if (isLoggedIn) {
    return <Alerta setAlerta={setAlerta} />; // Suponiendo que Alerta es la vista principal
  }

  return (
    <>
      <StatusBar backgroundColor="#0d73ae" barStyle="light-content" />
      <ImageBackground
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        source={require('./assets/images/fondo.jpg')}>
        <View style={{margin: '5%'}}>
          <Image
            style={{height: 130, width: 350, marginBottom: '6%'}}
            source={require('./assets/images/Diseños/ENCUENTRA_ME_LOGO_1.png')}
          />
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontFamily: 'Montserrat-Regular',
            }}>
            Correo electrónico
          </Text>

          <TextInput
            style={{
              backgroundColor: 'white',
              marginVertical: '4%',
              paddingHorizontal: 10,
              borderRadius: 30,
              height: '10%',
              color: 'black',
              fontSize: 18,
            }}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)} // Actualiza el estado de correo
            value={email}
          />

          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontFamily: 'Montserrat-Regular',
            }}>
            Contraseña
          </Text>

          <TextInput
            style={{
              backgroundColor: 'white',
              marginVertical: '4%',
              paddingHorizontal: 10,
              borderRadius: 30,
              height: '10%',
              color: 'black',
              fontSize: 18,
            }}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => setPassword(text)} // Actualiza el estado de contraseña
            value={password}
          />

          <View style={{flexDirection: 'row', margin: '2%'}}>
            <CheckBox />
            <Text>
              He leído, entiendo y acepto los términos y condiciones y politica
              de privacidad del uso de la plataforma
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={handleLogin} // Llama a handleLogin al presionar
              style={{
                backgroundColor: '#ec8715',
                padding: '5%',
                borderRadius: 25,
                marginTop: '5%',
                width: 250,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Black',
                }}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4faeba',
    color: '#4faeba',
  },
});
