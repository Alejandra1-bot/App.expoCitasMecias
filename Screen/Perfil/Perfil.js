import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
import  {useState} from "react";
import { useAppContext } from "../Configuracion/AppContext";

export default function Perfil  ({navigation}) {
   const [usuario, setUsuario] = useState(null);
   const [cargando, setCargando]= useState(true);
   const { colors, texts } = useAppContext();

  useEffect(() =>{
    const cargarPerfil = async() => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("No se encontro el token de usuario, redirigiendo al login");
          return;
        }
        const response = await api.get("/me");
        setUsuario (response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        if (error.isAuthError || error.shoulRedirecToLogin) {
          console.log("Error de autenticacion manejando por el interceptor, redifigiendo al login");
          return;  
        }

        if (error.response) {
          Alert.alert("Error del servidor", `Error ${error.response.status}: ${error.response.data?.message || "Ocurrio un error al cargar el perfil"}`,
            [
              {
                Text: "Ok",
                onPress: async () =>{
                   await AsyncStorage.removeItem("userToken");
                }
              }
            ]
          );
        }else if (error.response){
          Alert.alert("Error de conexion", "No se pudo conectar al servidor Verificar tu conexion a Internet",
            [
              {
                 Text: "Ok",
                onPress: async () =>{
                   await AsyncStorage.removeItem("userToken");
                }
              }
            ]
          );
        }else{
          Alert.alert(
            "Error ",
            "Ocurrio un error inesperado al cargar el  perfil.",
            [
              {
                 Text: "Ok",
                onPress: async () =>{
                   await AsyncStorage.removeItem("userToken");
                }
              }
            ]
          );
        }
      }finally{
        setLoandig(false);

      }
    };
    cargarPerfil();
  },[]);

  if (!usuario) {
    return(
     <View style={styles.container}>
      <Text style={styles.errorText}> Perfil de Usuario</Text>
      <View style={styles.containerPerfil}>
        <Text style={styles.errorText}> No se pudo Cargar El Perfil</Text>
      </View>
     </View>

    );
    
  }

  return(
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }}
          style={styles.photo}
        />
        <Text style={styles.errorText}>{texts.patientProfile}</Text>
        <Text style={styles.status}>{texts.activePatient}</Text>
      </View>
    
      {/* ================= DATOS PERSONALES ================= */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.personalData}</Text>
         <View style={styles.containerPerfil}>
        <Text style={styles.label}>👤Nombre: {usuario.user.Nombre || " No disponible "}</Text>
        <Text style={styles.label}>📧Correo: {usuario.user.Email || "No disponible "}</Text>
        <Text style={styles.label}>📞Teléfono: {usuario.user.Telefono || "No disponible "}</Text  >
        <Text style={styles.label}>📅Fecha de Nacimiento: {usuario.user.Fecha_nacimiento || "No disponible "}</Text>
        <Text style={styles.label}>♉Genero: {usuario.user.Genero || "No disponible "}</Text>
        <Text style={styles.label}>❤️RH: {usuario.user.RH || "No disponible "}</Text>
        <Text style={styles.label}>🌍Nacionalidad: {usuario.user.Nacionalidad || "No disponible "}</Text>




      </View>
     </View>
       {/* ================= INFORMACIÓN MÉDICA ================= */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.medicalInfo}</Text>
        <View style={styles.medicalBox}>
          <Text style={styles.infoText}>🩺 Médico Asignado: Dra. López</Text>
          <Text style={styles.infoText}>👩‍💼 Recepcionista: María González</Text>
        </View>
      </View>

      {/* ================= AJUSTES DE PERFIL ================= */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.profileSettings}</Text>

               <TouchableOpacity style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("CitasPaciente")}>
                 <Ionicons name="calendar-outline" size={24} color={colors.primary} />
                 <Text style={[styles.optionText, { color: colors.text }]}>{texts.viewAppointments}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("HistorialMedico")}>
                 <Ionicons name="document-text-outline" size={24} color={colors.primary} />
                 <Text style={[styles.optionText, { color: colors.text }]}>{texts.medicalHistory}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("EditarPerfil", { usuario })}>
                 <Ionicons name="create-outline" size={24} color={colors.primary} />
                 <Text style={[styles.optionText, { color: colors.text }]}>{texts.editProfile}</Text>
               </TouchableOpacity>
      </View>
   

       </ScrollView>
     

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#10B981", 
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 6,
  },
  errorText: {
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
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
  containerPerfil: {
    backgroundColor: "#E0F2FE",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  medicalBox: {
    backgroundColor: "#F3E8FF",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
    label: {
    fontSize: 16,
        borderRadius: 15,

    color: "#374151",
    marginBottom: 6,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    fontWeight: "500",
  },
});
