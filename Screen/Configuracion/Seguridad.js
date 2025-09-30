import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "./AppContext";

export default function Seguridad() {
  const { colors, texts } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="lock-closed-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>{texts.privacy}</Text>
        <Text style={styles.status}>Tu información está protegida</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Encriptación de Datos</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Todos tus datos médicos y personales están encriptados usando estándares de seguridad avanzados (AES-256).
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          La transmisión de datos se realiza a través de conexiones HTTPS seguras.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Acceso a Datos</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Solo el personal médico autorizado puede acceder a tu información médica.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Tú tienes control total sobre quién puede ver tus datos a través de la configuración de privacidad.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Autenticación</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Utilizamos autenticación de dos factores para proteger tu cuenta.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Tus sesiones expiran automáticamente después de un período de inactividad.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cumplimiento Normativo</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Cumplimos con todas las regulaciones de protección de datos (HIPAA, GDPR, etc.).
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Realizamos auditorías de seguridad regulares para mantener tus datos seguros.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    color: "#E9D5FF",
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});