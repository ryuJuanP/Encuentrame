import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Alerta from './Views/alerta';
import Mapa from './Views/mapa';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Alerta"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Alerta" component={Alerta} />
        <Stack.Screen name="Mapa" component={Mapa} />{' '}
        {/* Aquí debe estar registrado Mapa */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
