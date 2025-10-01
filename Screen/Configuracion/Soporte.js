import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "./AppContext";

export default function Soporte() {
  const { colors, texts } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="help-circle-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>{texts.help}</Text>
        <Text style={styles.status}>Estamos aquí para ayudarte</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Centro de Ayuda</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Encuentra respuestas a preguntas frecuentes sobre el uso de la aplicación médica.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Guías paso a paso para agendar citas, ver historial médico y gestionar tu perfil.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Contacto</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Email: soporte@clinicamedica.com
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Teléfono: +57 320-234- 5673
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Horario de atención: Lunes a Viernes, 8:00 AM - 6:00 PM
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Reportar Problemas</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Si encuentras un error o tienes problemas técnicos, por favor contáctanos con detalles específicos.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Incluye capturas de pantalla y describe los pasos para reproducir el problema.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actualizaciones</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Mantén tu aplicación actualizada para acceder a las últimas funciones y mejoras de seguridad.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Las actualizaciones se descargan automáticamente cuando hay conexión a internet.
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
    backgroundColor: "#EF4444",
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
    color: "#FECACA",
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