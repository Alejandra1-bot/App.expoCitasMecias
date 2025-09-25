import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearConsultorio, editarConsultorio } from "../../Src/Services/ConsultorioService";

export default function EditarConsultorio() {
  const navegation = useNavigation();
  const route = useRoute();

  const consultorio = route.params?.consultorio;

  const [Nombre, setNombre] = useState(consultorio ? consultorio.Nombre : "");
  const [Direccion, setDireccion] = useState(consultorio ? consultorio.Direccion : "");
  const [Ciudad, setCiudad] = useState(consultorio ? consultorio.Ciudad : "");
  const [Telefono, setTelefono] = useState(consultorio ? consultorio.Telefono : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!consultorio;

  const handleGuardar = async () => {
    if (!Nombre || !Direccion || !Ciudad || !Telefono) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarConsultorio(consultorio.id, {
          Nombre,
          Direccion,
          Ciudad,
          Telefono,
        });
      } else {
        result = await crearConsultorio({
          Nombre,
          Direccion,
          Ciudad,
          Telefono,
        });
      }
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizado" : "Consultorio creado correctamente");
        navegation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el consultorio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}
        </Text>

        {/* Formulario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={Direccion}
          onChangeText={setDireccion}
        />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={Ciudad}
          onChangeText={setCiudad}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Consultorio"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#110e0eff",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
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
