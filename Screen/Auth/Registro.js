import { useState } from 'react';
import { loginUser, registerUser } from '../../Src/Services/AuthService';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import BottonComponent from '../..//components/BottonComponents';

export default function Registro({ navigation }) {
  const [Nombre, setName] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Documento, setDocumento] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Email, setEmail] = useState('');
  const [Fecha_nacimiento, setFechaNacimiento] = useState('');
  const [Genero, setGenero] = useState('');
  const [RH, setRh] = useState('');
  const [Nacionalidad, setNacionalidad] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRol] = useState('');
   const [loading, setLoading] = useState(false);
const handleRegister = async () => {
  setLoading(true);
  const userData = {
    Nombre,
    Apellido,
    Documento,
    Telefono,
    Email,
    Fecha_nacimiento,
    Genero,
    RH,
    Nacionalidad,
    password,
    roles,
  };

  try {
    const result = await registerUser(userData);

    if (result.success) {
      // ✅ Ahora, hacemos login automáticamente
      const loginResult = await loginUser(Email, password);

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
    : result.message?.message || JSON.stringify(result.message);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
        <Text style={styles.title}>🩺 Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Regístrate en <Text style={styles.appName}>MediCitas</Text> y lleva el control de tus citas médicas 💊.
        </Text>

       
        <TextInput
          style={styles.input}
          placeholder=" Nombre"
          value={Nombre}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={Apellido}
          onChangeText={setApellido}
        />

        <TextInput
          style={styles.input}
          placeholder="Documento"
          value={Documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={Email}
          onChangeText={setEmail}
          
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
          value={Fecha_nacimiento}
          onChangeText={setFechaNacimiento}
        />

        <TextInput
          style={styles.input}
          placeholder=" Género (M/F)"
          value={Genero}
          onChangeText={setGenero}
          maxLength={1}
        />

        <TextInput
          style={styles.input}
          placeholder="RH (Ej: O+, A-)"
          value={RH}
          onChangeText={setRh}
        />

        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={Nacionalidad}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
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
