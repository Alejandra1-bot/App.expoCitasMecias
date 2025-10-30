import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarCitas, eliminarCita } from "../../Src/Services/CitasService";
import { listarPacientes } from "../../Src/Services/PacienteService";
import { listarMedicos } from "../../Src/Services/MedicoService";
import { listarRecepcionistas } from "../../Src/Services/RecepcionistaService";
import { useNavigation } from "@react-navigation/native";
import CitaCard from "../../components/CitaCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../Configuracion/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { colors, texts, userRole, userId } = useAppContext();
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [recepcionistas, setRecepcionistas] = useState([]);

  const handleCitas = async () => {
    setLoading(true);
    try {
      // Cargar listas de pacientes, médicos y recepcionistas
      const [citasResult, pacientesResult, medicosResult, recepcionistasResult] = await Promise.all([
        listarCitas(),
        listarPacientes(),
        listarMedicos(),
        listarRecepcionistas()
      ]);

      if (citasResult.success) {
        let filteredCitas = citasResult.data;
        if (userRole === 'paciente') {
          filteredCitas = citasResult.data.filter(cita => cita.idPaciente == parseInt(userId));
        } else if (userRole === 'medico') {
           filteredCitas = citasResult.data;
          // filteredCitas = citasResult.data.filter(cita => cita.idMedico == parseInt(userId));
        } else if (userRole === 'recepcionista') {
          // Recepcionista ve todas las citas
          filteredCitas = citasResult.data;
        }
        // Admin ve todas
        setCitas(filteredCitas);

        // Guardar las listas para pasar al detalle
        if (pacientesResult.success) setPacientes(pacientesResult.data);
        if (medicosResult.success) setMedicos(medicosResult.data);
        if (recepcionistasResult.success) setRecepcionistas(recepcionistasResult.data);
      } else {
        if (citasResult.message && citasResult.message.error === "Token inválido") {
          Alert.alert("Sesión expirada", "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          // Aquí podrías redirigir al login
        } else {
          Alert.alert("Error", citasResult.message || "No se pudieron cargar las citas");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert("Sesión expirada", "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        // Aquí podrías redirigir al login
      } else {
        Alert.alert("Error", "No se pudieron cargar las citas");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCitas);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (cita) => {
    navigation.navigate("EditarCita", { cita });
  };

  const handleCrear = () => {
    navigation.navigate("EditarCita");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarCita(id);
              if (result.success) {
                handleCitas();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la cita");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la cita");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CitaCard
            cita={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate("DetalleCita", {
              cita: item,
              pacientes: pacientes,
              medicos: medicos,
              recepcionistas: recepcionistas
            })}
          />
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.text }]}>{texts.noAppointments}</Text>}
      />

      {(userRole === 'administrador' || userRole === 'recepcionista') && (
        <TouchableOpacity style={[styles.botonCrear, { backgroundColor: colors.secondary }]} onPress={handleCrear}>
          <Text style={styles.textBotton}>{texts.newAppointment}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  botonCrear: {
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
