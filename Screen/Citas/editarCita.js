import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { crearCita, editarCita } from "../../Src/Services/CitasService";
import { listarPacientes } from "../../Src/Services/PacienteService";
import { listarMedicos } from "../../Src/Services/MedicoService";
import { listarRecepcionistas } from "../../Src/Services/RecepcionistaService";
import * as Notifications from 'expo-notifications';
import api from "../../Src/Services/Conexion";

export default function EditarCita() {
  const navigation = useNavigation();
  const route = useRoute();

  const cita = route.params?.cita;

  const [Fecha_cita, setFechaCita] = useState(cita ? cita.Fecha_cita : "");
  const [Hora, setHora] = useState(cita ? cita.Hora : "");
  const [Estado, setEstado] = useState(cita ? cita.Estado : "");
  const [idPaciente, setIdPaciente] = useState(cita ? String(cita.idPaciente) : "");
  const [idMedico, setIdMedico] = useState(cita ? String(cita.idMedico) : "");
  const [idResepcionista, setIdResepcionista] = useState(cita ? String(cita.idResepcionista) : "");
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!cita;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pacientesResult, medicosResult, recepcionistasResult] = await Promise.all([
          listarPacientes(),
          listarMedicos(),
          listarRecepcionistas()
        ]);
        if (pacientesResult.success) {
          setPacientes(pacientesResult.data);
        }
        if (medicosResult.success) {
          setMedicos(medicosResult.data);
        }
        if (recepcionistasResult.success) {
          setRecepcionistas(recepcionistasResult.data);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, []);

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

        // Obtener nombres de paciente, médico y recepcionista
        const pacienteSeleccionado = pacientes.find(p => String(p.id) === idPaciente);
        const medicoSeleccionado = medicos.find(m => String(m.id) === idMedico);
        const recepcionistaSeleccionado = recepcionistas.find(r => String(r.id) === idResepcionista);

        const nombrePaciente = pacienteSeleccionado ?
          `${pacienteSeleccionado.Nombre || pacienteSeleccionado.name || 'Paciente'} ${pacienteSeleccionado.apellido || pacienteSeleccionado.Apellido || ''}`.trim() :
          'Paciente';

        const nombreMedico = medicoSeleccionado ?
          `Dr. ${medicoSeleccionado.nombre || medicoSeleccionado.Nombre || 'Médico'} ${medicoSeleccionado.apellido || medicoSeleccionado.Apellido || ''}`.trim() :
          'Dr. Médico';

        const nombreRecepcionista = recepcionistaSeleccionado ?
          `${recepcionistaSeleccionado.nombre || recepcionistaSeleccionado.Nombre || 'Recepcionista'} ${recepcionistaSeleccionado.apellido || recepcionistaSeleccionado.Apellido || ''}`.trim() :
          'Recepcionista';

        if (!esEdicion) {
          // Notificación para nueva cita
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎉 ¡Cita Médica Confirmada!",
              body: `📅 Fecha: ${Fecha_cita}\n⏰ Hora: ${Hora}\n👤 Paciente: ${nombrePaciente}\n👨‍⚕️ Médico: ${nombreMedico}\n🏥 Recepcionista: ${nombreRecepcionista}\n📋 Estado: ${Estado}\n\n✅ Tu cita ha sido programada exitosamente`,
              sound: 'default',
              priority: Notifications.AndroidNotificationPriority.HIGH,
              color: '#10B981',
              vibrate: [0, 250, 250, 250],
              sticky: false,
            },
            trigger: null, // Mostrar inmediatamente
          });
        } else {
          // Notificación para edición de cita (cambio de estado)
          const estadoAnterior = cita.Estado;
          const estadoNuevo = Estado;

          if (estadoAnterior !== estadoNuevo) {
            let tituloNotificacion = "";
            let colorNotificacion = "";
            let emojiEstado = "";

            switch (estadoNuevo.toLowerCase()) {
              case 'confirmada':
                tituloNotificacion = "✅ Cita Confirmada";
                colorNotificacion = '#10B981';
                emojiEstado = "✅";
                break;
              case 'cancelada':
                tituloNotificacion = "❌ Cita Cancelada";
                colorNotificacion = '#EF4444';
                emojiEstado = "❌";
                break;
              case 'pendiente':
                tituloNotificacion = "⏳ Cita Pendiente";
                colorNotificacion = '#F59E0B';
                emojiEstado = "⏳";
                break;
              default:
                tituloNotificacion = "📝 Cita Actualizada";
                colorNotificacion = '#3B82F6';
                emojiEstado = "📝";
            }

            await Notifications.scheduleNotificationAsync({
              content: {
                title: tituloNotificacion,
                body: `📅 Fecha: ${Fecha_cita}\n⏰ Hora: ${Hora}\n👤 Paciente: ${nombrePaciente}\n👨‍⚕️ Médico: ${nombreMedico}\n${emojiEstado} Nuevo Estado: ${estadoNuevo.charAt(0).toUpperCase() + estadoNuevo.slice(1)}\n\n🔄 Tu cita ha sido actualizada`,
                sound: 'default',
                priority: Notifications.AndroidNotificationPriority.HIGH,
                color: colorNotificacion,
                vibrate: [0, 250, 250, 250],
                sticky: false,
              },
              trigger: null, // Mostrar inmediatamente
            });

          }

        }

        // Enviar email de confirmación al paciente (solo para nuevas citas)
        if (!esEdicion && pacienteSeleccionado?.Email) {
          try {
            // Preparar datos para el email
            const emailData = {
              email: pacienteSeleccionado.Email,
              paciente: nombrePaciente,
              fecha: Fecha_cita,
              hora: Hora,
              medico: nombreMedico,
              recepcionista: nombreRecepcionista,
              estado: Estado
            };

            console.log("Datos para enviar email de cita:", emailData);

            // Enviar email al backend
            const emailResult = await api.post('/enviarEmailCita', emailData);
            if (emailResult.success) {
              console.log("Email de confirmación enviado exitosamente");
            } else {
              console.error("Error al enviar email:", emailResult.message);
            }

          } catch (emailError) {
            // console.error("Error al procesar envío de email:", emailError);
          }
        }

        navigation.goBack();
      } else {
       Alert.alert("Error", JSON.stringify(result.message) || "No se pudo guardar  la cita");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
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
          placeholder="Hora (HH:MM)"
          value={Hora}
          onChangeText={setHora}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={Estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona Estado" value="" />
            <Picker.Item label="Pendiente" value="pendiente" />
            <Picker.Item label="Confirmada" value="confirmada" />
            <Picker.Item label="Cancelada" value="cancelada" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Paciente</Text>
          <Picker
            selectedValue={idPaciente}
            onValueChange={(itemValue) => setIdPaciente(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un paciente" value="" />
            {pacientes && pacientes.length > 0 && pacientes.map((paciente) => (
              <Picker.Item
                key={paciente.id}
                label={`${paciente.Nombre || paciente.name || 'Sin Nombre'} ${paciente.apellido || paciente.Apellido || 'Sin Apellido'} (${paciente.id})`}
                value={String(paciente.id)}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Médico</Text>
          <Picker
            selectedValue={idMedico}
            onValueChange={(itemValue) => setIdMedico(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un médico" value="" />
            {medicos && medicos.length > 0 && medicos.map((medico) => (
              <Picker.Item
                key={medico.id}
                label={`${medico.nombre || medico.Nombre || 'Sin Nombre'} ${medico.apellido || medico.Apellido || 'Sin Apellido'} (${medico.id})`}
                value={String(medico.id)}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Recepcionista</Text>
          <Picker
            selectedValue={idResepcionista}
            onValueChange={(itemValue) => setIdResepcionista(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un recepcionista" value="" />
            {recepcionistas && recepcionistas.length > 0 && recepcionistas.map((recepcionista) => (
              <Picker.Item
                key={recepcionista.id}
                label={`${recepcionista.nombre || recepcionista.Nombre || 'Sin Nombre'} ${recepcionista.apellido || recepcionista.Apellido || 'Sin Apellido'} (${recepcionista.id})`}
                value={String(recepcionista.id)}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Cita"}
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  innerContainer: { padding: 16 },
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  picker: {
    height: 50,
    color: "#111",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
});
