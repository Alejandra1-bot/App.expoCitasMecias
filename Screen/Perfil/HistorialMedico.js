import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistorialMedico() {
  // 🔹 Aquí deberías cargar tu historial desde tu API
  const historial = [
    { id: "1", fecha: "2025-08-15", diagnostico: "Gripe común", tratamiento: "Paracetamol 500mg cada 8h", medico: "Dr. Pérez" },
    { id: "2", fecha: "2025-07-03", diagnostico: "Hipertensión", tratamiento: "Losartán 50mg diario", medico: "Dra. Gómez" },
    { id: "3", fecha: "2025-05-21", diagnostico: "Alergia", tratamiento: "Loratadina 10mg", medico: "Dr. Ramírez" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medkit-outline" size={50} color="#fff" />
        <Text style={styles.headerTitle}>Historial Médico</Text>
      </View>

      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📅 {item.fecha}</Text>
            <Text style={styles.cardText}>🩺 Diagnóstico: {item.diagnostico}</Text>
            <Text style={styles.cardText}>💊 Tratamiento: {item.tratamiento}</Text>
            <Text style={styles.cardText}>👨‍⚕️ Médico: {item.medico}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#059669",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 15,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 10 },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#111827", marginBottom: 6 },
  cardText: { fontSize: 15, color: "#374151", marginBottom: 4 },
});
