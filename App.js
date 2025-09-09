import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Inicio from './Screen/Inicio/inicio';

export default function App() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>🏥 Bienvenidos a la App de Citas Médicas</Text>
      <Text style={estilos.subtitulo}>
        Gestiona pacientes, médicos y citas de manera fácil y rápida
      </Text>

      <View style={estilos.contenedorInicio}>
        <Inicio />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2647', // Azul oscuro moderno
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#a9c4ff',
    marginBottom: 20,
    textAlign: 'center',
  },

  contenedorInicio: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 6,
  },
});
