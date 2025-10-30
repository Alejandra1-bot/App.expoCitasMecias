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
              key="administradores"
              tittle="Administradores"
              description="Gestión de administradores."
              icon="shield-checkmark-outline"
              color="#DC2626"
              onPress={() => navigation.navigate("AdministradoresFlow")}
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
              description="Gestión de médicos."
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
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>🏥 Centro de Información</Text>

            <View style={styles.servicesGrid}>
              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>🕒</Text>
                </View>
                <Text style={styles.serviceTitle}>Horarios</Text>
                <Text style={styles.serviceText}>
                  Lun-Vie: 7AM-6PM{'\n'}
                  Sáb: 8AM-2PM{'\n'}
                  Dom: Cerrado
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>📞</Text>
                </View>
                <Text style={styles.serviceTitle}>Contacto</Text>
                <Text style={styles.serviceText}>
                  Tel: (1) 123-4567{'\n'}
                  Emergencias: 911{'\n'}
                  Email:@clinica.com
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>🏥</Text>
                </View>
                <Text style={styles.serviceTitle}>Ubicación</Text>
                <Text style={styles.serviceText}>
                  Calle Principal #123{'\n'}
                  Sogamoso, Colombia{'\n'}
                  Estacionamiento disponible
                </Text>
              </View>

              <View style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.iconText}>💊</Text>
                </View>
                <Text style={styles.serviceTitle}>Servicios</Text>
                <Text style={styles.serviceText}>
                  Consultas generales{'\n'}
                  Especialidades{'\n'}
                  Laboratorio y RX
                </Text>
              </View>
            </View>

            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>💡 Consejos para tu Salud</Text>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipItem}>• Mantén una alimentación balanceada</Text>
                <Text style={styles.tipItem}>• Realiza ejercicio regularmente</Text>
                <Text style={styles.tipItem}>• Acude a tus citas médicas</Text>
                <Text style={styles.tipItem}>• Mantén tus vacunas al día</Text>
                <Text style={styles.tipItem}>• Realiza chequeos anuales</Text>
              </View>
            </View>
          </View>
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
  infoSection: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0c0b0bff",
    textAlign: "center",
    marginBottom: 25,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    width: '48%',
    alignItems: "center",
  },
  serviceIcon: {
    backgroundColor: "#10B981",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  iconText: {
    fontSize: 28,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  serviceText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
  tipsSection: {
    backgroundColor: "#E0F2FE",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
    textAlign: "center",
  },
  tipsContainer: {
    // Container for tips
  },
  tipItem: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 20,
  },
});
