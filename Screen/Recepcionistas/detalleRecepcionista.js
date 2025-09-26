import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function DetalleRecepcionista() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recepcionista } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="people-circle-outline" size={80} color="#fff" />
        <Text style={styles.headerTitle}>
          {recepcionista.Nombre} {recepcionista.Apellido}
        </Text>
        <Text style={styles.headerSub}>Turno: {recepcionista.Turno}</Text>
      </View>

      {/* Información */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>📞 Teléfono:</Text>
        <Text style={styles.value}>{recepcionista.Telefono}</Text>

        <Text style={styles.label}>📧 Email:</Text>
        <Text style={styles.value}>{recepcionista.Email}</Text>
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
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 8 },
  headerSub: { fontSize: 16, color: "#E5E7EB", marginTop: 4 },
  infoBox: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginTop: 10 },
  value: { fontSize: 16, color: "#111", marginBottom: 8 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    margin: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, marginLeft: 8, fontWeight: "600" },
});
