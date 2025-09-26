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
import { crearCita, editarCita } from "../../Src/Services/CitasService";

export default function EditarCita() {
  const navigation = useNavigation();
  const route = useRoute();

  const cita = route.params?.cita;

  const [Fecha_cita, setFechaCita] = useState(cita ? cita.Fecha_cita : "");
  const [Hora, setHora] = useState(cita ? cita.Hora : "");
  const [Estado, setEstado] = useState(cita ? cita.Estado : "Pendiente");
  const [idPaciente, setIdPaciente] = useState(cita ? String(cita.idPaciente) : "");
  const [idMedico, setIdMedico] = useState(cita ? String(cita.idMedico) : "");
  const [idResepcionista, setIdResepcionista] = useState(cita ? String(cita.idResepcionista) : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!cita;

  const handleGuardar = async () => {
    if (!Fecha_cita || !Hora || !Estado || !idPaciente || !idMedico || !idResepcionista) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      let result;
      const data = {
        Fecha_cita,
        Hora,
        Estado,
        idPaciente,
        idMedico,
        idResepcionista,
      };

      if (esEdicion) {
        result = await editarCita(cita.id, data);
      } else {
        result = await crearCita(data);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada correctamente");
        navigation.goBack();
      } else {
       Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar el médico");  
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Cita Médica" : "Nueva Cita Médica"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Fecha de Cita (YYYY-MM-DD)"
          value={Fecha_cita}
          onChangeText={setFechaCita}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM:SS)"
          value={Hora}
          onChangeText={setHora}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado (Pendiente, Confirmada, Cancelada)"
          value={Estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Paciente"
          value={idPaciente}
          onChangeText={setIdPaciente}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID Médico"
          value={idMedico}
          onChangeText={setIdMedico}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID Recepcionista"
          value={idResepcionista}
          onChangeText={setIdResepcionista}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Cita"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginVertical: 10,
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
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
