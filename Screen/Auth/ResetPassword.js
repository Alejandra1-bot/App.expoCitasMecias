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
import { useState, useEffect } from "react";
import { resetPassword } from "../../Src/Services/AuthService";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ResetPassword({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const route = useRoute();
  const nav = useNavigation();
  const theme = useColorScheme(); // "light" | "dark"

  useEffect(() => {
    // Extraer el código de los parámetros de la ruta
    const { code: urlCode } = route.params || {};
    if (urlCode) {
      setCode(urlCode);
    } else {
      Alert.alert("Error", "Código de restablecimiento no válido");
      nav.goBack();
    }
  }, [route.params, nav]);

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
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    try {
      const result = await resetPassword(code, newPassword);
      if (result.success) {
        Alert.alert("Éxito", "Contraseña restablecida correctamente", [
          { text: "OK", onPress: () => nav.navigate("Login") }
        ]);
      } else {
        Alert.alert(
          "Error",
          typeof result.message === "string"
            ? result.message
            : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al restablecer la contraseña"
        );
      }
    } catch (error) {
      console.error("Error inesperado en restablecimiento:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al restablecer la contraseña");
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
        <Text style={[styles.titulo, { color: colors.text }]}>🔐 Restablecer Contraseña</Text>
        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Ingresa tu nueva contraseña
        </Text>

        {/* Input Nueva Contraseña */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="🔒 Nueva Contraseña"
          placeholderTextColor={colors.subtext}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          editable={!loading}
        />

        {/* Input Confirmar Contraseña */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="🔒 Confirmar Contraseña"
          placeholderTextColor={colors.subtext}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <BottonComponent
          title="✅ Restablecer Contraseña"
          onPress={handleResetPassword}
          disabled={loading}
          gradient
        />

        <BottonComponent
          title="⬅️ Volver al Login"
          onPress={() => nav.navigate("Login")}
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