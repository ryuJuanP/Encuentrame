import React, {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import Alerta from './Views/alerta';

export default function App() {
  const [alerta, setAlerta] = useState(false);

  if (alerta) {
    return <Alerta setAlerta={setAlerta} />;
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
        <Image
          style={{height: 130, width: 350, marginBottom: '6%'}}
          source={require('./assets/images/Diseños/ENCUENTRA_ME_LOGO_1.png')}
        />
        <Text style={{fontSize: 18, color: 'white'}}> Correo electronico </Text>
        <TextInput style={{backgroundColor: 'white', marginVertical: '4%'}} />
        <Text style={{fontSize: 18, color: 'white'}}>Contraseña</Text>
        <TextInput style={{backgroundColor: 'white', marginVertical: '4%'}} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setAlerta(true)}
            style={{
              backgroundColor: '#ec8715',
              padding: '7%',
              borderRadius: 10,
              marginTop: '5%',
            }}>
            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
