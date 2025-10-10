import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Screen/Configuracion/AppContext";

export default function CitaCard({ cita, pacientes = [], medicos = [], recepcionistas = [], consultorios = [], especialidades = [], onEdit, onDelete, onPress }) {
  const { colors, userRole } = useAppContext();
  const inicial = cita.Estado ? cita.Estado.charAt(0).toUpperCase() : "?";

  

  const paciente = pacientes.find(p => p.id == cita.idPaciente);
  const medico = medicos.find(m => String(m.id) === String(cita.idMedico));
  const recepcionista = recepcionistas.find(r => String(r.id) === String(cita.idRecepcionista));
  const consultorio = consultorios.find(c => c.id == medico?.idConsultorio);
  const especialidad = especialidades.find(e => e.id == medico?.idEspecialidad);

 
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Pressable style={styles.pressableArea} onPress={onPress}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={[styles.nombre, { color: colors.text }]}>Cita Médica</Text>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Fecha: {cita.Fecha_cita}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="time-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Hora: {cita.Hora}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="alert-circle-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Estado: {cita.Estado}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="person-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Paciente: {paciente ? `${paciente.name || paciente.Nombre} ${paciente.apellido || paciente.Apellido}` : `ID: ${cita.idPaciente}`}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="medkit-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Médico: {medico ? `${medico.nombre || medico.Nombre || medico.name}` : `ID: ${cita.idMedico}`}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="people-outline" size={16} color={colors.tabBarInactive} />
            <Text style={[styles.detalle, { color: colors.text }]}> Recepcionista: {cita.idResepcionista}</Text>
          </View>


        </View>
      </Pressable>

      {/* Botones Editar / Eliminar */}
      {(userRole === 'administrador' || userRole === 'recepcionista') && (
        <View style={styles.actions}>
          <Pressable
            onPress={onEdit}
            style={({ pressed }) => [
              styles.button,
              styles.editBtn,
              { backgroundColor: colors.primary },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [
              styles.button,
              styles.deleteBtn,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
  },
  pressableArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    marginLeft: 4,
  },
  actions: {
    flexDirection: "column",
    marginLeft: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  editBtn: {
    // backgroundColor set dynamically
  },
  deleteBtn: {
    backgroundColor: "#f20c0c",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
