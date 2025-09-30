import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "./AppContext";

export default function Apariencia() {
  const { theme, setTheme, colors, texts } = useAppContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="color-palette-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>{texts.appearance}</Text>
        <Text style={styles.status}>Personaliza tu experiencia visual</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.selectAppearance}</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Elige entre el modo claro para un aspecto luminoso y fácil de leer, o el modo oscuro para reducir la fatiga visual en ambientes con poca luz.
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          La configuración se guarda automáticamente y se aplica a toda la aplicación.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Opciones Disponibles</Text>

        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: colors.border },
            theme === "light" && styles.buttonSelected
          ]}
          onPress={() => setTheme("light")}
        >
          <Ionicons name="sunny-outline" size={24} color={theme === "light" ? "#fff" : colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>{texts.light}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: colors.border },
            theme === "dark" && styles.buttonSelected
          ]}
          onPress={() => setTheme("dark")}
        >
          <Ionicons name="moon-outline" size={24} color={theme === "dark" ? "#fff" : colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>{texts.dark}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Beneficios del Tema Oscuro</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • Reduce el consumo de batería en dispositivos con pantalla OLED
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • Menos fatiga visual en ambientes oscuros
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • Aspecto moderno y elegante
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#2563EB",
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
    color: "#DBEAFE",
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    borderColor: "#27ae60",
    backgroundColor: "#d5f5e3"
  },
  text: { fontSize: 18, marginLeft: 10 }
});