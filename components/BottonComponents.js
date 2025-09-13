import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BottonComponent({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0A74DA", // Azul principal
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 25, // Bordes redondeados tipo pill
    alignItems: "center",
    marginVertical: 12,

    // Sombras para efecto elevado
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    color: "#fff", // Texto blanco
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
});
