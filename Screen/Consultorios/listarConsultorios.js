import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet} from "react-native";
import { listarConsultorios, eliminarConsultorio } from "../../Src/Services/ConsultorioService";
import { useNavigation } from "@react-navigation/native";
import ConsultorioCard from "../../components/consultorioCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../Configuracion/AppContext";

export default function ListarConsultorios (){
    const [consultorios, setConsultorios] = useState([]);
    const navegation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { colors, texts, userRole } = useAppContext();

    const handleConsultorios = async () =>{
      setLoading(true);
      try {
        const result = await listarConsultorios();
        if (result.success) {
          setConsultorios(result.data);
        }else{
         Alert.alert("Error", JSON.stringify(error.message));
        }
      } catch (error) {
        Alert.alert("Error ", "No se pudieron cargar los consultorios");
      } finally{
        setLoading(false);
      }
    }

    useEffect(() => {
      const unsubscribe = navegation.addListener('focus', handleConsultorios);
      return unsubscribe;
    },[navegation]);

    const handleEditar = (consultorio) =>{
      navegation.navigate("EditarConsultorio", { consultorio });
    }
    const handleCrear = () =>{
      navegation.navigate("EditarConsultorio");
    }

    const handleEliminar = (id) =>{
      Alert.alert(
        "Confirmar Eliminación",    
        "¿Estás seguro de eliminar este consultorio?",
        [
          {text: "Cancelar", style: "cancel"},
          {text: "Eliminar", style: "destructive",
            onPress: async () =>{
              try {
                const result = await eliminarConsultorio(id);
                if (result.success) {
                  handleConsultorios();
                } else {
                   Alert.alert("Error ", result.message || "No se pudo eliminar el consultorio");  
                }                 
              } catch (error) {
                Alert.alert("Error ", "No se pudo eliminar el consultorio"); 
              }
            },
          },
        ]
      );
    }

    if (loading) {
      return (
        <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={consultorios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ConsultorioCard
              consultorio={item}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
              userRole={userRole}
            />
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.text }]}>{texts.noOffices}</Text>}
        />

        {userRole === 'administrador' && (
          <TouchableOpacity style={[styles.botonCrear, { backgroundColor: colors.secondary }]} onPress={handleCrear}>
            <Text style={styles.textBotton}>{texts.newOffice}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
} 

const styles = StyleSheet.create({
  centered:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty:{
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  botonCrear:{
    padding: 16,
    borderRadius: 30,
    margin: 16,
    alignItems: "center",
  },
  textBotton:{
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
