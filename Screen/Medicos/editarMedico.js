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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { crearMedico, editarMedico } from "../../Src/Services/MedicoService";
import { listarConsultorios } from "../../Src/Services/ConsultorioService";
import { listarEspecialidades } from "../../Src/Services/EspecialidadesService";
import { useAppContext } from "../Configuracion/AppContext";

export default function EditarMedico() {
  const navegation = useNavigation();
  const route = useRoute();

  const medico = route.params?.medico;
       const { colors, texts } = useAppContext();

  const [Nombre, setNombre] = useState(medico ? medico.Nombre : "");
  const [Apellido, setApellido] = useState(medico ? medico.Apellido : "");
  const [Documento, setDocumento] = useState(medico ? medico.Documento : "");
  const [Telefono, setTelefono] = useState(medico ? medico.Telefono : "");
  const [Email, setEmail] = useState(medico ? medico.Email : "");
  const [Password, setPassword] = useState(""); // contraseña
  const [idConsultorio, setIdConsultorio] = useState(
    medico ? String(medico.idConsultorio) : ""
  );
  const [idEspecialidad, setIdEspecialidad] = useState(
    medico ? String(medico.idEspecialidad) : ""
  );

  const [consultorios, setConsultorios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!medico;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [consultoriosResult, especialidadesResult] = await Promise.all([
          listarConsultorios(),
          listarEspecialidades()
        ]);
        if (consultoriosResult.success) {
          setConsultorios(consultoriosResult.data);
        }
        if (especialidadesResult.success) {
          setEspecialidades(especialidadesResult.data);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    if (!Nombre || !Apellido || !Documento || !Telefono || !Email || !idConsultorio || !idEspecialidad) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarMedico(medico.id, {
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Password,
          idConsultorio,
          idEspecialidad,
        });
      } else {
        result = await crearMedico({
          Nombre,
          Apellido,
          Documento,
          Telefono,
          Email,
          Password,
          idConsultorio,
          idEspecialidad,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Médico actualizado" : "Médico creado correctamente");
        navegation.goBack();
      } else {
        Alert.alert(esEdicion ? "Error al editar el médico" : "Error al crear el médico", JSON.stringify(result.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el médico");
    } finally {
      setLoading(false);
    }
  };

  return (
        <KeyboardAvoidingView  //Contenedor que ajusta su comportamiento cuando aparece el teclado.
              style={[styles.container, { backgroundColor: colors.background }]}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          {esEdicion ? "Editar Médico" : "Nuevo Médico"}
        </Text>

        {/* Formulario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={Apellido}
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Documento"
          value={Documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={Password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Consultorio</Text>
          <Picker
            selectedValue={idConsultorio}
            onValueChange={(itemValue) => setIdConsultorio(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un consultorio" value="" />
            {consultorios.map((consultorio) => (
              <Picker.Item
                key={consultorio.id}
                label={`${consultorio.nombre || consultorio.Nombre || consultorio.name} (${consultorio.id})`}
                value={String(consultorio.id)}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Especialidad</Text>
          <Picker
            selectedValue={idEspecialidad}
            onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una especialidad" value="" />
            {especialidades.map((especialidad) => (
              <Picker.Item
                key={especialidad.id}
                label={`${especialidad.nombre || especialidad.Nombre || especialidad.name} (${especialidad.id})`}
                value={String(especialidad.id)}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGuardar}
          disabled={loading}
        >
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Crear Médico"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerTitle: {
   fontSize: 22,
   fontWeight: "bold",
   color: "#110e0eff",
   marginTop: 10,
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
    marginTop: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
