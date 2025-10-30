import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { listarAdministradores, eliminarAdministrador } from "../../Src/Services/AdministradorService";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppContext } from "../Configuracion/AppContext";
import { Ionicons } from "@expo/vector-icons";
import AdministradorCard from "../../components/AdministradorCard";

export default function ListarAdministradores() {
  const [administradores, setAdministradores] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { colors, texts, userRole } = useAppContext();

  const handleAdministradores = async () => {
    setLoading(true);
    try {
      const result = await listarAdministradores();
      console.log("Resultado de listar administradores:", result);
      if (result.success) {
        console.log("Administradores obtenidos:", result.data);
        // El backend devuelve los datos en result.data.data
        const administradoresData = result.data?.data || result.data || [];
        console.log("Datos a mostrar:", administradoresData);
        setAdministradores(administradoresData);
      } else {
        console.log("Error en la respuesta:", result.message);
        Alert.alert("Error", result.message || "No se pudieron cargar los administradores");
      }
    } catch (error) {
      console.log("Error en la petición:", error);
      Alert.alert("Error", "No se pudieron cargar los administradores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleAdministradores);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (administrador) => {
    navigation.navigate("EditarAdministrador", { administrador });
  };

  const handleCrear = () => {
    navigation.navigate("EditarAdministrador");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este administrador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarAdministrador(id);
              if (result.success) {
                handleAdministradores();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el administrador");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el administrador");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Administradores</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={administradores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AdministradorCard
            administrador={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>
            No hay administradores registrados
          </Text>
        }
      />

      {userRole === 'administrador' && (
        <TouchableOpacity
          style={[styles.botonCrear, { backgroundColor: colors.secondary }]}
          onPress={handleCrear}
        >
          <Text style={styles.textBotton}>+ Nuevo Administrador</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#10B981",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40, // Para balancear el botón de retroceso
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  botonCrear: {
    backgroundColor: "#0a18d6ff",
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});