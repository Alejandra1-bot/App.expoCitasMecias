import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetallePaciente({ route, navigation }) {
  const { paciente } = route.params;

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>{paciente.Nombre} {paciente.Apellido}</Text>
        <Text style={styles.headerSubtitle}>📄 Detalles del paciente</Text>
      </View>

      {/* Información */}
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.item}> Documento: {paciente.Documento}</Text>
        <Text style={styles.item}> Teléfono: {paciente.Telefono}</Text>
        <Text style={styles.item}> Email: {paciente.Email}</Text>
        <Text style={styles.item}> Fecha de nacimiento: {paciente.Fecha_nacimiento}</Text>
        <Text style={styles.item}> Género: {paciente.Genero}</Text>
        <Text style={styles.item}> Grupo RH: {paciente.RH}</Text>
        <Text style={styles.item}> Nacionalidad: {paciente.Nacionalidad}</Text>
      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#1E40AF",
    paddingVertical: 35,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    elevation: 4,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: "#E5E7EB", marginTop: 5 },
  infoContainer: { padding: 20 },
  item: {
    fontSize: 16,
    color: "#111",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  editText: { color: "#fff", fontSize: 16, marginLeft: 8, fontWeight: "600" },
});
