import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Configuracion/AppContext";

export default function Informacion({ navigation }) {
  const { colors, texts } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={52} color="#FACC15" />
        <Text style={styles.headerTitle}>Información Útil</Text>
        <Text style={styles.subtitle}>Todo lo que necesitas saber</Text>
      </View>

      {/* ================= CONTENIDO ================= */}
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>🕒 Horarios de Atención</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Lunes a Viernes: 7:00 AM - 6:00 PM</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Sábados: 8:00 AM - 2:00 PM</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Domingos: Cerrado</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>📞 Contacto de Emergencia</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Teléfono: (1) 123-4567</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Emergencias: 911</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Email: info@clinicasaludplus.com</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>🏥 Servicios Disponibles</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Consultas médicas generales</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Especialidades médicas</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Laboratorio clínico</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Radiología</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Farmacia</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>💡 Consejos de Salud</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Mantén una alimentación balanceada</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Realiza ejercicio regularmente</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Acude a tus citas médicas puntualmente</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Mantén tus vacunas al día</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>• Realiza chequeos médicos anuales</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>📍 Ubicación</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Dirección: Calle Principal #123</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Ciudad: Bogotá, Colombia</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>Estacionamiento disponible</Text>
        </View>
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
    backgroundColor: "#10B981",
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
  subtitle: {
    fontSize: 14,
    color: "#F0FDF4",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: "#E0F2FE",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
});