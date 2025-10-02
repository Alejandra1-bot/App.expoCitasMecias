import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet,ScrollView  } from "react-native";
import { listarMedicos, eliminarMedico } from "../../Src/Services/MedicoService";
import { useNavigation } from "@react-navigation/native";
import MedicoCard from "../../components/MedicoCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../Configuracion/AppContext";

export default function ListarMedicos() {
       const { colors, texts, userRole } = useAppContext();

   const [medicos, setMedicos] = useState([]);
   const navegation = useNavigation();
   const [loading, setLoading] = useState(false);

  const handleMedicos = async () => {
    setLoading(true);
    try {
      const result = await listarMedicos();
      if (result.success) {
        setMedicos(result.data);
      } else {
         Alert.alert("Error", JSON.stringify(error.message));
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navegation.addListener("focus", handleMedicos);
    return unsubscribe;
  }, [navegation]);

  const handleEditar = (medico) => {
    navegation.navigate("EditarMedico", { medico });
  };

  const handleCrear = () => {
    navegation.navigate("EditarMedico");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de eliminar este médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarMedico(id);
              if (result.success) {
                handleMedicos();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el médico");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
        // <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
    
    <View style={{ flex: 1 }}>
      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicoCard
            medico={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            userRole={userRole}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay Médicos Registrados.</Text>}
      />

      {userRole === 'administrador' && (
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textBotton}>+Nuevo Médico</Text>
        </TouchableOpacity>
      )}
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
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
