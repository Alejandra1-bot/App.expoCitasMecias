import { TextInput, Text, View, StyleSheet, Image } from "react-native";
import BottonComponent from "../../components/BottonComponents";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* Imagen médica ilustrativa */}
      

      {/* Título y subtítulo */}
      <Text style={styles.titulo}>🏥 Citas Médicas</Text>
      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder=" @ Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder=" ** Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      {/* Botones */}
      <BottonComponent title="✅ Iniciar Sesión" />

      <BottonComponent
        title="📝 ¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={{ backgroundColor: "#0A2647" }} // azul oscuro secundario
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF", // Fondo claro suave
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A74DA", // Azul principal
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d7e2",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 15,

    // Sombra ligera
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
