import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useState } from "react";

export default function InicioPaciente({ navigation }) {
  const [citas, setCitas] = useState([
    { id: "1", doctor: "Dr. López", fecha: "2025-10-01", hora: "09:00 AM", estado: "Pendiente" },
    { id: "2", doctor: "Dra. Martínez", fecha: "2025-10-03", hora: "11:00 AM", estado: "Confirmada" },
  ]);

  const renderCita = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctor}>👨‍⚕️ {item.doctor}</Text>
      <Text>📅 Fecha: {item.fecha}</Text>
      <Text>⏰ Hora: {item.hora}</Text>
      <Text>📌 Estado: {item.estado}</Text>
      <View style={styles.botones}>
        <Button title="❌ Cancelar" color="red" onPress={() => console.log("Cancelar cita", item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏥 Panel del Paciente</Text>

      <Button
        title="📅 Agendar Nueva Cita"
        onPress={() => navigation.navigate("AgendarCita")}
      />

      <Text style={styles.subtitulo}>Mis próximas citas</Text>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={renderCita}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EAF6FF" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#003366" },
  subtitulo: { fontSize: 18, marginVertical: 10, color: "#0A74DA" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  doctor: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  botones: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
