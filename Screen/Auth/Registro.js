import { useState } from 'react';
import { loginUser, registerUser } from '../../Src/Services/AuthService';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import BottonComponent from '../..//components/BottonComponents';

export default function Registro({ navigation }) {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [rh, setRh] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRol] = useState('');
   const [loading, setLoading] = useState(false);
const handleRegister = async () => {
  setLoading(true);
  const userData = {
    name,
    apellido,
    documento,
    telefono,
    email,
    fechaNacimiento,
    genero,
    rh,
    nacionalidad,
    password,
    roles,
  };

  try {
    const result = await registerUser(userData);

    if (result.success) {
      // ✅ Ahora, hacemos login automáticamente
      const loginResult = await loginUser(email, password);

      if (loginResult.success) {
        // Aquí puedes guardar el token si tu login lo devuelve
        // Ejemplo con AsyncStorage:
        // await AsyncStorage.setItem("token", loginResult.token);

        Alert.alert("Éxito", "Registro exitoso, redirigiendo al inicio", [
          {
            text: "OK",
            onPress: () => navigation.navigate("InicioPantalla"),
          },
        ]);
      } else {
        Alert.alert(
          "Error",
          "Registro exitoso, pero fallo el inicio de sesión automático"
        );
      }
    } else {
      let errorMessage =
        typeof result.message === "string"
          ? result.message
          : JSON.stringify(result.message);

      Alert.alert("Error", errorMessage || "Ocurrió un error en el registro");
    }
  } catch (error) {
    Alert.alert("Error", "Error inesperado en el registro");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🩺 Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Regístrate en <Text style={styles.appName}>MediCitas</Text> y lleva el control de tus citas médicas 💊.
        </Text>

       
        <TextInput
          style={styles.input}
          placeholder=" Nombre"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />

        <TextInput
          style={styles.input}
          placeholder="Documento"
          value={documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />

        <TextInput
          style={styles.input}
          placeholder=" Género (M/F)"
          value={genero}
          onChangeText={setGenero}
          maxLength={1}
        />

        <TextInput
          style={styles.input}
          placeholder="RH (Ej: O+, A-)"
          value={rh}
          onChangeText={setRh}
        />

        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChangeText={setNacionalidad}
        />

        <TextInput
          style={styles.input}
          placeholder=" Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
         <TextInput
          style={styles.input}
          placeholder=" Rol"
          value={roles}
          onChangeText={setRol}
          
        />

        {/* Botones */}
        <BottonComponent title="Registrarse"  onPress={handleRegister} disabled={loading} />

        <BottonComponent
          title="¿Ya tienes cuenta? Inicia Sesión"
          onPress={() => navigation.navigate('Login')}
          style={{ backgroundColor: '#0A2647' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#003366',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  appName: {
    fontWeight: 'bold',
    color: '#0A74DA',
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#cfd9e6',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
