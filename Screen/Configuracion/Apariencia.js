import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppContext } from "./AppContext";

export default function Apariencia() {
  const { theme, setTheme } = useAppContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#fff" : "#222" }
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme === "light" ? "#000" : "#fff" }
        ]}
      >
        
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          theme === "light" && styles.buttonSelected
        ]}
        onPress={() => setTheme("light")}
      >
        <Text style={styles.text}>Claro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          theme === "dark" && styles.buttonSelected
        ]}
        onPress={() => setTheme("dark")}
      >
        <Text style={styles.text}>Oscuro</Text>
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
    borderColor: "#27ae60",
    backgroundColor: "#d5f5e3"
  },
  text: { fontSize: 18 }
});