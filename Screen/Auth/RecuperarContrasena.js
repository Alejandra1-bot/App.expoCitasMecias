import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme
} from "react-native";
import BottonComponent from "../../components/BottonComponents";
import { useState } from "react";
import { requestPasswordReset } from "../../Src/Services/AuthService";

export default function RecuperarContrasena({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useColorScheme(); // "light" | "dark"

  const colors = theme === "dark"
    ? {
        background: "#0F172A",
        card: "#1E293B",
        text: "#F1F5F9",
        subtext: "#94A3B8",
        border: "#334155",
        inputBg: "#1E293B",
      }
    : {
        background: "#E0F2FE",
        card: "#fff",
        text: "#0F172A",
        subtext: "#64748B",
        border: "#CBD5E1",
        inputBg: "#F8FAFC",
      };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }
    setLoading(true);
    try {
      const result = await requestPasswordReset(email);
      if (result.success) {
        Alert.alert("Éxito", "Se ha enviado un código de recuperación a tu correo electrónico");
        navigation.navigate("VerificarCodigo", { email });
      } else {
        Alert.alert(
          "Error",
          typeof result.message === "string"
            ? result.message
            : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al enviar la solicitud"
        );
      }
    } catch (error) {
      console.error("Error inesperado en recuperación:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar recuperar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Logo */}
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.logo}
        />

        {/* Título */}
        <Text style={[styles.titulo, { color: colors.text }]}>🔑 Recuperar Contraseña</Text>
        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Ingresa tu correo electrónico para recibir un  Codigo de  recuperación
        </Text>

        {/* Input */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="📧 Correo electrónico"
          placeholderTextColor={colors.subtext}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <BottonComponent
          title="📤 Enviar "
          onPress={handleResetPassword}
          disabled={loading}
          gradient
        />

        <BottonComponent
          title="⬅️ Volver al Login"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#0A2647", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 25 }}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
  },
});