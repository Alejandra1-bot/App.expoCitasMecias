import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Iniciando sesión con:", email, password);
    // Aquí irá la lógica de autenticación
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={estilos.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={estilos.boton} onPress={handleLogin}>
        <Text style={estilos.textoBoton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0a74da',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#0a74da',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
