import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppContext } from "./AppContext";

export default function Idioma() {
  const { language, setLanguage } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar idioma</Text>

      <TouchableOpacity
        style={[
          styles.button,
          language === "es" && styles.buttonSelected
        ]}
        onPress={() => setLanguage("es")}
      >
        <Text style={styles.text}>Español</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          language === "en" && styles.buttonSelected
        ]}
        onPress={() => setLanguage("en")}
      >
        <Text style={styles.text}>English</Text>
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
    borderColor: "#aaa",
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