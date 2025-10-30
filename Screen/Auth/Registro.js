import { useState } from 'react';
import { loginUser, registerUser } from '../../Src/Services/AuthService';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { Picker } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import BottonComponent from '../../components/BottonComponents';

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
  const [roles, setRol] = useState('paciente');
  const [idConsultorio, setIdConsultorio] = useState('');
  const [idEspecialidad, setIdEspecialidad] = useState('');
  const [Turno, setTurno] = useState('');
    const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState('');
const handleRegister = async () => {
  // Validación de contraseña
  if (password.length < 8) {
    Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  // Validación de email
  if (!Email.endsWith('@gmail.com')) {
    Alert.alert("Error", "El correo electrónico debe terminar con @gmail.com.");
    return;
  }

  // Validación de códigos de acceso para roles restringidos
  const validCodes = {
    administrador: 'ADMIN2025',
    medico: 'MEDICO2025',
    recepcionista: 'RECEP2025'
  };

  if (roles === 'administrador' || roles === 'medico' || roles === 'recepcionista') {
    if (!accessCode) {
      Alert.alert("Error", `Se requiere un código de acceso único para el rol de ${roles === 'administrador' ? 'Administrador' : roles === 'medico' ? 'Médico' : 'Recepcionista'}.`);
      return;
    }
    if (accessCode !== validCodes[roles]) {
      Alert.alert("Error", `Código de acceso incorrecto para el rol de ${roles === 'administrador' ? 'Administrador' : roles === 'medico' ? 'Médico' : 'Recepcionista'}.`);
      return;
    }
  }

  const requiredFields = roles === 'administrador'
    ? [Nombre, Apellido, Documento, Telefono, Email, password, roles]
    : roles === 'recepcionista'
    ? [Nombre, Apellido, Documento, Telefono, Email, password, roles, Turno]
    : [Nombre, Apellido, Documento, Telefono, Email, Fecha_nacimiento, Genero, RH, Nacionalidad, password, roles];

  if (requiredFields.some(field => !field)) {
    Alert.alert("Error", "Por favor, completa todos los campos requeridos, incluyendo el rol.");
    return;
  }
  if (roles === 'medico' && (!idConsultorio || !idEspecialidad)) {
    Alert.alert("Error", "Para médicos, completa ID Consultorio e ID Especialidad.");
    return;
  }
  setLoading(true);
  const userData = {
    Nombre,
    Apellido,
    Documento,
    Telefono,
    Email,
    ...((roles !== 'administrador' && roles !== 'recepcionista') && {
      Fecha_nacimiento,
      Genero,
      RH,
      Nacionalidad,
    }),
    password,
    roles,
    ...(roles === 'medico' && { idConsultorio, idEspecialidad }),
    ...(roles === 'recepcionista' && { Turno }),
  };

  try {
    const result = await registerUser(userData);
    if (result.success) {
      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } else {
      let errorMessage =typeof result.message === "string"? result.message : result.message?.message || JSON.stringify(result.message);
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
    <KeyboardAvoidingView  //Contenedor que ajusta su comportamiento cuando aparece el teclado.
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

        {(roles !== 'administrador' && roles !== 'recepcionista') && (
          <>
            <TextInput
              style={styles.input}
              placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
              value={Fecha_nacimiento}
              onChangeText={setFechaNacimiento}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={Genero}
                onValueChange={(itemValue) => setGenero(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona Género" value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
              </Picker>
            </View>

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
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder=" Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {roles === 'recepcionista' && (
          <TextInput
            style={styles.input}
            placeholder="Turno"
            value={Turno}
            onChangeText={setTurno}
          />
        )}

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={roles}
            onValueChange={(itemValue) => setRol(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Paciente" value="paciente" />
            <Picker.Item label="Médico" value="medico" />
            <Picker.Item label="Recepcionista" value="recepcionista" />
            <Picker.Item label="Administrador" value="administrador" />
          </Picker>
        </View>

        {(roles === 'administrador' || roles === 'medico' || roles === 'recepcionista') && (
          <TextInput
            style={styles.input}
            placeholder="Código de acceso"
            secureTextEntry
            value={accessCode}
            onChangeText={setAccessCode}
          />
        )}

        {roles === 'medico' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="ID Consultorio"
              value={idConsultorio}
              onChangeText={setIdConsultorio}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="ID Especialidad"
              value={idEspecialidad}
              onChangeText={setIdEspecialidad}
              keyboardType="numeric"
            />
          </>
        )}

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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cfd9e6',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 50,
  },
});
