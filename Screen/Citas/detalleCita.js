import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function DetalleCita() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cita } = route.params; // recibe la cita enviada desde ListarCitas

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={80} color="#fff" />
        <Text style={styles.headerTitle}>Cita Médica</Text>
        <Text style={styles.headerSub}>{cita.Estado}</Text>
      </View>

      {/* Información */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>📅 Fecha de Cita:</Text>
        <Text style={styles.value}>{cita.Fecha_cita}</Text>

        <Text style={styles.label}>⏰ Hora:</Text>
        <Text style={styles.value}>{cita.Hora}</Text>

        <Text style={styles.label}>📌 Estado:</Text>
        <Text style={styles.value}>{cita.Estado}</Text>

        <Text style={styles.label}>🧑 Paciente (ID):</Text>
        <Text style={styles.value}>{cita.idPaciente}</Text>

        <Text style={styles.label}>👨‍⚕️ Médico (ID):</Text>
        <Text style={styles.value}>{cita.idMedico}</Text>

        <Text style={styles.label}>👩‍💼 Recepcionista (ID):</Text>
        <Text style={styles.value}>{cita.idResepcionista}</Text>
      </View>

      {/* Botón volver */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}> Volver</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  headerSub: { fontSize: 16, color: "#E5E7EB", marginTop: 4 },
  infoBox: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#111",
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    margin: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
