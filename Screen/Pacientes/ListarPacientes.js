import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ListarPacientes({ navigation }) {
  const [pacientes, setPacientes] = useState([
    {
      id: "1",
      Nombre: "Juan",
      Apellido: "Pérez",
      Documento: "12345678",
      Telefono: "300111222",
      Email: "juan@gmail.com",
      Fecha_nacimiento: "1990-05-15",
      Genero: "Masculino",
      RH: "O+",
      Nacionalidad: "Colombiana",
    },
    {
      id: "2",
      Nombre: "María",
      Apellido: "López",
      Documento: "98765432",
      Telefono: "310333444",
      Email: "maria@gmail.com",
      Fecha_nacimiento: "1988-10-20",
      Genero: "Femenino",
      RH: "A-",
      Nacionalidad: "Mexicana",
    },
  ]);

  const handleAgregar = () => {
    navigation.navigate("EditarPaciente", { onSave: agregarPaciente });
  };

  const agregarPaciente = (nuevoPaciente) => {
    setPacientes([...pacientes, { ...nuevoPaciente, id: Date.now().toString() }]);
  };

  const actualizarPaciente = (pacienteActualizado) => {
    setPacientes(pacientes.map(p => p.id === pacienteActualizado.id ? pacienteActualizado : p));
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="people-circle-outline" size={60} color="#fff" />
        <Text style={styles.headerTitle}>Gestión de Pacientes</Text>
        <Text style={styles.headerSubtitle}>📋 Lista completa de pacientes registrados</Text>
      </View>

      {/* Botón agregar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
        <Ionicons name="person-add-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Agregar Paciente</Text>
      </TouchableOpacity>

      {/* Lista de pacientes */}
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetallePaciente", { paciente: item })}
            onLongPress={() =>
              navigation.navigate("EditarPaciente", { paciente: item, onSave: actualizarPaciente })
            }
          >
            <Ionicons name="person-circle-outline" size={45} color="#2563EB" />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.Nombre} {item.Apellido}</Text>
              <Text style={styles.field}> {item.Documento}</Text>
              <Text style={styles.field}> {item.Telefono}</Text>
              <Text style={styles.field}> {item.Email}</Text>
              <Text style={styles.field}> {item.Fecha_nacimiento}</Text>
              <Text style={styles.field}> {item.Genero}</Text>
              <Text style={styles.field}> {item.RH}</Text>
              <Text style={styles.field}>{item.Nacionalidad}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  /* ===== Encabezado ===== */
  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 15,
    elevation: 4,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: "#E5E7EB", marginTop: 5 },

  /* ===== Botón agregar ===== */
  addButton: {
    flexDirection: "row",
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
  },
  addText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 16 },

  /* ===== Tarjetas de pacientes ===== */
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 2,
  },
  cardInfo: { marginLeft: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  field: { fontSize: 14, color: "#374151", marginTop: 2 },
});
