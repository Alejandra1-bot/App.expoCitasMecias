import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Configuracion({navigation}) {


  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("userToken"); // eliminar token o sesión
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente", [
      { text: "OK", onPress: () => navigation.replace("login") },
    ]);
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};


  return (
    <ScrollView style={styles.container}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={70} color="#fff" />
        <Text style={styles.headerTitle}>Configuración Médica</Text>
        <Text style={styles.status}>Ajusta tu aplicación de citas</Text>
      </View>

      {/* ================= OPCIONES GENERALES ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opciones Generales</Text>


              <TouchableOpacity 
        style={styles.optionCard} 
        onPress={() => navigation.navigate("Apariencia")}
>
  <Ionicons name="color-palette-outline" size={28} color="#2563EB" />
  <Text style={styles.optionText}>Apariencia</Text>
</TouchableOpacity>

<TouchableOpacity 
  style={styles.optionCard} 
  onPress={() => navigation.navigate("idioma")}
>
  <Ionicons name="globe-outline" size={28} color="#F59E0B" />
  <Text style={styles.optionText}>Idioma</Text>
</TouchableOpacity>


       

        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="notifications-outline" size={28} color="#10B981" />
          <Text style={styles.optionText}>Preferencias de Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="lock-closed-outline" size={28} color="#8B5CF6" />
          <Text style={styles.optionText}>Privacidad y Seguridad</Text>
        </TouchableOpacity>
      </View>

      {/* ================= OPCIONES MÉDICAS ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuracion Principal </Text>


        <TouchableOpacity style={styles.optionCard}>
          <Ionicons name="help-circle-outline" size={28} color="#EF4444" />
          <Text style={styles.optionText}>Ayuda y Soporte</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.optionCard, { backgroundColor: "#FEE2E2" }]}
             onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={28} color="#EF4444" />
          <Text style={styles.optionText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#10B981", // Verde salud
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
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
});
