import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useState, useEffect } from "react";

export default function InicioDoctor() {
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Juan Pérez", hora: "09:00 AM", estado: "Pendiente" },
    { id: "2", paciente: "Ana Gómez", hora: "10:30 AM", estado: "Confirmada" },
    { id: "3", paciente: "Carlos Ruiz", hora: "12:00 PM", estado: "Pendiente" },
  ]);

  const renderCita = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.paciente}</Text>
      <Text>⏰ Hora: {item.hora}</Text>
      <Text>📌 Estado: {item.estado}</Text>
      <View style={styles.botones}>
        <Button title="✅ Confirmar" onPress={() => console.log("Confirmar", item.id)} />
        <Button title="❌ Cancelar" color="red" onPress={() => console.log("Cancelar", item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👨‍⚕️ Panel del Doctor</Text>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={renderCita}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F9FF" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0A74DA" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  nombre: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
