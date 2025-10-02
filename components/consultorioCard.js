import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../Screen/Configuracion/AppContext";

export default function ConsultorioCard({ consultorio, onEdit, onDelete, userRole }) {
  const navigation = useNavigation();
  const { colors } = useAppContext();
  const inicial = consultorio.Nombre ? consultorio.Nombre.charAt(0).toUpperCase() : "?";

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => navigation.navigate("DetalleConsultorio", { consultorio })}
    >
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.nombre, { color: colors.text }]}>{consultorio.Nombre}</Text>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color={colors.tabBarInactive} />
          <Text style={[styles.detalle, { color: colors.text }]}> {consultorio.Direccion}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="business-outline" size={16} color={colors.tabBarInactive} />
          <Text style={[styles.detalle, { color: colors.text }]}> {consultorio.Ciudad}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={16} color={colors.tabBarInactive} />
          <Text style={[styles.detalle, { color: colors.text }]}> {consultorio.Telefono}</Text>
        </View>
      </View>

      {/* Botones */}
      {userRole === 'administrador' && (
        <View style={styles.actions}>
          <Pressable
            onPress={onEdit}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.secondary },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.danger },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
          </Pressable>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    marginLeft: 4,
  },
  actions: {
    flexDirection: "column",
    marginLeft: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
