import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function DetalleCita() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cita, pacientes = [], medicos = [], recepcionistas = [] } = route.params; // recibe la cita y listas

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

        <Text style={styles.label}>🧑 Paciente:</Text>
        <Text style={styles.value}>
          {(() => {
            const paciente = pacientes.find(p => p.id == cita.idPaciente);
            return paciente ? `${paciente.nombre || paciente.Nombre} ${paciente.apellido || paciente.Apellido}` : `ID: ${cita.idPaciente}`;
          })()}
        </Text>

        <Text style={styles.label}>👨‍⚕️ Médico:</Text>
        <Text style={styles.value}>
          {(() => {
            const medico = medicos.find(m => m.id == cita.idMedico);
            return medico ? `${medico.nombre || medico.Nombre} ${medico.apellido || medico.Apellido}` : `ID: ${cita.idMedico}`;
          })()}
        </Text>

        <Text style={styles.label}>👩‍💼 Recepcionista:</Text>
        <Text style={styles.value}>
          {(() => {
            const recepcionista = recepcionistas.find(r => r.id == cita.idResepcionista || r.id == cita.idRecepcionista);
            return recepcionista ? `${recepcionista.nombre || recepcionista.Nombre} ${recepcionista.apellido || recepcionista.Apellido}` : `ID: ${cita.idResepcionista}`;
          })()}
        </Text>
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
