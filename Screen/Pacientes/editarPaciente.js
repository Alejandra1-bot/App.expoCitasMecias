import React, { useState } from "react";
import {View,TextInput,TouchableOpacity, Text, StyleSheet, ScrollView,KeyboardAvoidingView, Platform, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearPaciente, editarPaciente } from "../../Src/Services/PacienteService";
import { updatePassword } from "../../Src/Services/AuthService";
import { editarPerfil } from "../../Src/Services/PerfilService";

export default function EditarPaciente() {
  const navegation = useNavigation();
  const route = useRoute();

  const paciente = route.params ?.paciente;

  const [Nombre, setNombre] = useState(paciente ? paciente.Nombre || paciente.nombre : "");
  const [Apellido, setApellido] = useState(paciente ? paciente.Apellido || paciente.apellido : "");
  const [Documento, setDocumento] = useState(paciente ? paciente.Documento || paciente.documento : "");
  const [Telefono, setTelefono] = useState(paciente ? paciente.Telefono || paciente.telefono : "");
  const [Email, setEmail] = useState(paciente ? paciente.Email || paciente.email || paciente.correo : "");
  const [Fecha_nacimiento, setFechaNacimiento] = useState(paciente ? paciente.Fecha_nacimiento || paciente.fecha_nacimiento : "");
  const [Genero, setGenero] = useState(paciente ? paciente.Genero || paciente.genero : "");
  const [RH, setRH] = useState(paciente ? paciente.RH || paciente.rh : "");
  const [Nacionalidad, setNacionalidad] = useState(paciente ? paciente.Nacionalidad || paciente.nacionalidad : "");
  const [password, setPassword] =  useState(paciente ? paciente.password : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente; // es true si estamos editando

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Documento || !Telefono || !Email || !Fecha_nacimiento || !Genero || !RH || !Nacionalidad) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarPaciente(paciente.id, {
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Fecha_nacimiento,
          Genero,
          RH,
          Nacionalidad,
        });

        // Actualizar perfil de usuario también
        const perfilResult = await editarPerfil({
          nombre: Nombre,
          apellido: Apellido,
          email: Email,
          telefono: Telefono,
        });

        if (!perfilResult.success) {
          Alert.alert("Advertencia", "Los datos del paciente se actualizaron pero hubo un problema con el perfil: " + perfilResult.message);
        }

        // Si se cambió la contraseña, actualizarla por separado
        if (password) {
          const passwordResult = await updatePassword(password);
          if (!passwordResult.success) {
            Alert.alert("Advertencia", "Los datos se actualizaron pero hubo un problema con la contraseña: " + (passwordResult.message?.message || passwordResult.message));
          }
        }
      } else {
         result = await crearPaciente({
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
        });
      }
      if (result.success) {
        Alert.alert("Exito", esEdicion ? "Paciente actualizado" : "Paciente creado correctamente");
        // Forzar recarga del perfil después de editar
        if (esEdicion) {
          // Pasar un parámetro para indicar que se actualizó
          navegation.goBack({ updated: true });
        } else {
          navegation.goBack();
        }
      } else {
        Alert.alert(esEdicion ? "Error al editar el paciente" : "Error al crear el paciente", JSON.stringify(result.message));
      }

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el Paciente");
    }finally {
      setLoading(false);
    }
  }

  
  return (
        <KeyboardAvoidingView  //Contenedor que ajusta su comportamiento cuando aparece el teclado.
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.headerTitle}> {esEdicion ? "Editar " : "Nuevo Paciente "}</Text>

          {/* Formulario */}
        
            <TextInput
              style={styles.input}
              placeholder=" Nombre"
              value={Nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder=" Apellido"
              value={Apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder=" Documento"
              value={Documento}
              onChangeText={setDocumento}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder=" Teléfono"
              value={Telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder=" Email"
              value={Email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder=" Fecha de nacimiento (YYYY-MM-DD)"
              value={Fecha_nacimiento}
              onChangeText={setFechaNacimiento}
            />
            <TextInput
              style={styles.input}
              placeholder=" Género"
              value={Genero}
              onChangeText={setGenero}
            />
            <TextInput
              style={styles.input}
              placeholder=" Grupo RH"
              value={RH}
              onChangeText={setRH}
            />
            <TextInput
              style={styles.input}
              placeholder=" Nacionalidad"
              value={Nacionalidad}
              onChangeText={setNacionalidad}

            />
            {!esEdicion && (
              <TextInput
                style={styles.input}
                placeholder=" ** Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
            )}

              <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
                <Ionicons name="save-outline" size={22} color="#fff" />
                <Text style={styles.buttonText}> {esEdicion ? "Guardar Cambios" : "Crear Paciente"} </Text>
              </TouchableOpacity> 
              </View>

            </ScrollView> 
            </KeyboardAvoidingView>
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    elevation: 4,
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    marginTop: 10,
  },
  headerSubtitle: { fontSize: 14, color: "#E5E7EB", marginTop: 5 },
  form: { padding: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 500,
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});



