import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarPaciente({ route, navigation }) {
  const { paciente, onSave } = route.params || {};

  const [Nombre, setNombre] = useState(paciente ? paciente.Nombre : "");
  const [Apellido, setApellido] = useState(paciente ? paciente.Apellido : "");
  const [Documento, setDocumento] = useState(paciente ? paciente.Documento : "");
  const [Telefono, setTelefono] = useState(paciente ? paciente.Telefono : "");
  const [Email, setEmail] = useState(paciente ? paciente.Email : "");
  const [Fecha_nacimiento, setFechaNacimiento] = useState(
    paciente ? paciente.Fecha_nacimiento : ""
  );
  const [Genero, setGenero] = useState(paciente ? paciente.Genero : "");
  const [RH, setRH] = useState(paciente ? paciente.RH : "");
  const [Nacionalidad, setNacionalidad] = useState(
    paciente ? paciente.Nacionalidad : ""
  );

  const handleGuardar = () => {
    if (!Nombre || !Apellido || !Documento || !Telefono || !Email) {
      alert("⚠️ Completa todos los campos obligatorios");
      return;
    }
    const nuevoPaciente = paciente
      ? {
          ...paciente,
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Fecha_nacimiento,
          Genero,
          RH,
          Nacionalidad,
        }
      : {
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Fecha_nacimiento,
          Genero,
          RH,
          Nacionalidad,
        };

    if (onSave) {
      onSave(nuevoPaciente); // solo si viene definido
    }

    alert("✅ Paciente guardado con éxito");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Ionicons name="person-add-outline" size={60} color="#fff" />
          <Text style={styles.headerTitle}>Agregar / Editar Paciente</Text>
          <Text style={styles.headerSubtitle}>
            ✍️ Completa los datos del paciente
          </Text>
        </View>

        {/* Formulario */}
        <ScrollView
          style={styles.form}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
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

          <TouchableOpacity style={styles.button} onPress={handleGuardar}>
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Guardar Paciente</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
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
