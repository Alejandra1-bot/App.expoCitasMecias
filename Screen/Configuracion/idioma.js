import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppContext } from "./AppContext";

export default function Idioma() {
  const { language, setLanguage, colors, texts } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{texts.selectLanguage}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: colors.border },
          language === "es" && styles.buttonSelected
        ]}
        onPress={() => setLanguage("es")}
      >
        <Text style={[styles.text, { color: colors.text }]}>{texts.spanish}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: colors.border },
          language === "en" && styles.buttonSelected
        ]}
        onPress={() => setLanguage("en")}
      >
        <Text style={[styles.text, { color: colors.text }]}>{texts.english}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center"
  },
  buttonSelected: {
    borderColor: "#3498db",
    backgroundColor: "#d6eaf8"
  },
  text: { fontSize: 18 }
});