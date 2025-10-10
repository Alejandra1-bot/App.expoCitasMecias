import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardComponents from "../../components/CardComponent";
import { useAppContext } from "../Configuracion/AppContext";

export default function Inicio({ navigation }) {
     const { colors, texts, userRole } = useAppContext();
  
  return (
    
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Ionicons name="medkit-outline" size={52} color="#FACC15" />
        <Text style={styles.headerTitle}>Clínica Salud+</Text>
        <Text style={styles.cloudText}>🏥 Tu sistema de gestión médica</Text>
        <Text style={styles.status}>⚡ Plataforma Activa</Text>
        <Text style={styles.subtitle}>Selecciona una opción</Text>
      </View>

      {/* ================= GRID DE TARJETAS ================= */}
      <View style={styles.gridContainer}>
        {userRole === 'administrador' ? (
          <>
            <CardComponents
              key="pacientes"
              tittle="Pacientes"
              description="Gestión de pacientes."
              icon="person-outline"
              color="#2563EB"
              onPress={() => navigation.navigate("PacientesFlow")}
            />

            <CardComponents
              key="medicos"
              tittle="Médicos"
              description="Gestión de médicos."
              icon="medkit-outline"
              color="#10B981"
              onPress={() => navigation.navigate("MedicosFlow")}
            />

            <CardComponents
              key="consultorios"
              tittle="Consultorios"
              description="Gestión de consultorios."
              icon="business-outline"
              color="#8B5CF6"
              onPress={() => navigation.navigate("ConsultoriosFlow")}
            />

            <CardComponents
              key="especialidades"
              tittle="Especialidades"
              description="Gestión de especialidades médicas."
              icon="list-outline"
              color="#F59E0B"
              onPress={() => navigation.navigate("EspecialidadesFlow")}
            />

            <CardComponents
              key="recepcionistas"
              tittle="Recepcionistas"
              description="Gestión de recepcionistas."
              icon="people-outline"
              color="#06B6D4"
              onPress={() => navigation.navigate("RecepcionistasFlow")}
            />

            <CardComponents
              key="citas"
              tittle="Citas"
              description="Gestión de citas médicas."
              icon="calendar-outline"
              color="#EF4444"
              onPress={() => navigation.navigate("CitasFlow")}
            />
          </>
        ) : userRole === 'recepcionista' ? (
          <>
            <CardComponents
              key="pacientes"
              tittle="Pacientes"
              description="Listar pacientes."
              icon="person-outline"
              color="#2563EB"
              onPress={() => navigation.navigate("PacientesFlow")}
            />

            <CardComponents
              key="medicos"
              tittle="Médicos"
              description="Listar médicos."
              icon="medkit-outline"
              color="#10B981"
              onPress={() => navigation.navigate("MedicosFlow")}
            />

            <CardComponents
              key="consultorios"
              tittle="Consultorios"
              description="Listar consultorios."
              icon="business-outline"
              color="#8B5CF6"
              onPress={() => navigation.navigate("ConsultoriosFlow")}
            />

            <CardComponents
              key="especialidades"
              tittle="Especialidades"
              description="Listar especialidades médicas."
              icon="list-outline"
              color="#F59E0B"
              onPress={() => navigation.navigate("EspecialidadesFlow")}
            />

            <CardComponents
              key="citas"
              tittle="Citas"
              description="Crear, editar y eliminar citas médicas."
              icon="calendar-outline"
              color="#EF4444"
              onPress={() => navigation.navigate("CitasFlow")}
            />
          </>
        ) : userRole === 'medico' ? (
          <>
            <CardComponents
              key="consultorios"
              tittle="Consultorios"
              description="Ver consultorios."
              icon="business-outline"
              color="#8B5CF6"
              onPress={() => navigation.navigate("ConsultoriosFlow")}
            />

            <CardComponents
              key="especialidades"
              tittle="Especialidades"
              description="Listar especialidades médicas."
              icon="list-outline"
              color="#F59E0B"
              onPress={() => navigation.navigate("EspecialidadesFlow")}
            />

            <CardComponents
              key="recepcionistas"
              tittle="Recepcionistas"
              description="Listar recepcionistas."
              icon="people-outline"
              color="#06B6D4"
              onPress={() => navigation.navigate("RecepcionistasFlow")}
            />

            <CardComponents
              key="citas"
              tittle="Citas"
              description="Ver citas médicas."
              icon="calendar-outline"
              color="#EF4444"
              onPress={() => navigation.navigate("CitasFlow")}
            />
          </>
        ) : userRole === 'paciente' ? (
          <CardComponents
            key="citas"
            tittle="Mis Citas"
            description="Ver mis citas médicas."
            icon="calendar-outline"
            color="#EF4444"
            onPress={() => navigation.navigate("CitasFlow")}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#10B981", // 💚 verde salud coherente con perfil/configuración
    paddingVertical: 55,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  cloudText: {
    fontSize: 14,
    color: "#D1FAE5",
    textAlign: "center",
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    color: "#BBF7D0", // verde claro
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#F0FDF4",
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
