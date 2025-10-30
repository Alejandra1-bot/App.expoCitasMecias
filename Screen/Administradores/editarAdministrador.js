import React, { useState } from "react";
import {View,TextInput,TouchableOpacity, Text, StyleSheet, ScrollView,KeyboardAvoidingView, Platform, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearAdministrador, editarAdministrador } from "../../Src/Services/AdministradorService";
import { updatePassword } from "../../Src/Services/AuthService";

export default function EditarAdministrador() {
  const navegation = useNavigation();
  const route = useRoute();

  const administrador = route.params?.administrador;

  const [Nombre, setNombre] = useState(administrador ? administrador.Nombre || administrador.nombre : "");
  const [Apellido, setApellido] = useState(administrador ? administrador.Apellido || administrador.apellido : "");
  const [Documento, setDocumento] = useState(administrador ? administrador.Documento || administrador.documento : "");
  const [Telefono, setTelefono] = useState(administrador ? administrador.Telefono || administrador.telefono : "");
  const [Email, setEmail] = useState(administrador ? administrador.Email || administrador.email || administrador.correo : "");
  const [password, setPassword] = useState(administrador ? administrador.password : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!administrador;

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Documento || !Telefono || !Email || (!esEdicion && !password)) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarAdministrador(administrador.id, {
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
        });

        // Si se cambió la contraseña, actualizarla por separado
        if (password) {
          const passwordResult = await updatePassword(password);
          if (!passwordResult.success) {
            Alert.alert("Advertencia", "Los datos se actualizaron pero hubo un problema con la contraseña: " + (passwordResult.message?.message || passwordResult.message));
          }
        }
      } else {
         result = await crearAdministrador({
           Nombre,
           Apellido,
           Documento,
           Telefono,
           Email,
           Password: password,
           rol: 'administrador'
         });
       }
      if (result.success) {
        Alert.alert("Exito", esEdicion ? "Administrador actualizado" : "Administrador creado correctamente");
        navegation.goBack();
      } else {
        Alert.alert(esEdicion ? "Error al editar el administrador" : "Error al crear el administrador", JSON.stringify(result.message));
      }

    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el Administrador");
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
            {/* Encabezado */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navegation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{esEdicion ? "Editar Administrador" : "Nuevo Administrador"}</Text>
              <View style={styles.placeholder} />
            </View>

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
                <Text style={styles.buttonText}> {esEdicion ? "Guardar Cambios" : "Crear Administrador"} </Text>
              </TouchableOpacity>
              </View>

            </ScrollView>
            </KeyboardAvoidingView>
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#10B981",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40, // Para balancear el botón de retroceso
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


