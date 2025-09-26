import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Citas() {
  // 🔹 Aquí deberías cargar tus citas desde tu API
  const citas = [
    { id: "1", fecha: "2025-09-23", hora: "10:00 AM", motivo: "Consulta general" },
    { id: "2", fecha: "2025-09-28", hora: "02:00 PM", motivo: "Control anual" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={50} color="#fff" />
        <Text style={styles.headerTitle}>Mis Citas</Text>
      </View>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>📅 {item.fecha}</Text>
            <Text style={styles.cardText}>⏰ {item.hora}</Text>
            <Text style={styles.cardText}>🩺 {item.motivo}</Text>
          </View>
        )}
      />
    </View>
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
  cardText: { fontSize: 16, color: "#374151", marginBottom: 4 },
});
