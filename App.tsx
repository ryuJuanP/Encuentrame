/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
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
  SafeAreaView,
  Button,
} from 'react-native';
import axios from 'axios';
import Alerta from './Views/alerta';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [alerta, setAlerta] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

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
        <Text
          style={{
            color: 'white',
            fontFamily: 'Montserrat-Regular',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 0},
            textShadowRadius: 10,
            fontSize: 26,
            fontWeight: '800',
          }}>
          Iniciando sesión
        </Text>
      </View>
    );
  }

  if (alerta) {
    return <Alerta setAlerta={setAlerta} />;
  }

  if (isLoggedIn) {
    return <Alerta setAlerta={setAlerta} />;
  }

  return (
    <>
      <StatusBar backgroundColor="#0d73ae" barStyle="light-content" />
      <ImageBackground
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        source={require('./assets/images/fondo.jpg')}>
        <View>
          <Image
            style={{
              zIndex: 999,
              height: 140,
              width: 350,
              marginBottom: '6%',
            }}
            source={require('./assets/images/Diseños/ENCUENTRA_ME_LOGO_1.png')}
          />
          <SafeAreaView>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                textShadowColor: 'black',
                textShadowOffset: {width: -1, height: 0},
                textShadowRadius: 10,
                fontSize: 20,
                fontWeight: '800',
              }}>
              Correo electrónico
            </Text>

            <TextInput
              style={styles.input}
              inputMode="email"
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
            />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                textShadowColor: 'black',
                textShadowOffset: {width: -1, height: 0},
                textShadowRadius: 10,
                fontSize: 20,
                fontWeight: '800',
              }}>
              Contraseña
            </Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              inputMode="text"
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleLogin}
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
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                    textShadowColor: 'black',
                    textShadowOffset: {width: -1, height: 0},
                    textShadowRadius: 10,
                    fontSize: 22,
                    fontWeight: '800',
                  }}>
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
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
  input: {
    backgroundColor: 'white',
    color: 'black',
    height: 50,
    margin: 0,
    marginTop: 5,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 18,
  },
});
