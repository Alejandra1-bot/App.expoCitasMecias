import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "./AppContext";

export default function Notificaciones() {
  const { colors, texts } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>{texts.notifications}</Text>
        <Text style={styles.status}>Configura tus preferencias de notificación</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tipos de Notificaciones</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Recibe recordatorios de citas médicas, actualizaciones de estado y alertas importantes sobre tu salud.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Puedes activar o desactivar notificaciones push, correos electrónicos y mensajes SMS según tus preferencias.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Horarios de Notificación</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Las notificaciones se envían durante el horario laboral (8:00 AM - 6:00 PM) para no interrumpir tu descanso.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Para emergencias médicas, las notificaciones se envían inmediatamente sin importar la hora.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacidad</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Tus datos personales nunca se comparten con terceros. Las notificaciones contienen solo información necesaria para tu cuidado médico.
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
    backgroundColor: "#10B981",
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
    color: "#D1FAE5",
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