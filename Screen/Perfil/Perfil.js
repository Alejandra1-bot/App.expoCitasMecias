import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  {useState} from "react";
import { useAppContext } from "../Configuracion/AppContext";
import { listarCitas } from "../../Src/Services/CitasService";
import CitaCard from "../../components/CitaCard";

export default function Perfil  ({navigation}) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando]= useState(true);
    const [citas, setCitas] = useState([]);
    const { colors, texts, userRole, userId } = useAppContext();

  useEffect(() =>{
    const cargarDatos = async () => {
      setUsuario({ user: {} });
      if (userRole === 'paciente' || userRole === 'medico') {
        try {
          const result = await listarCitas();
          if (result.success) {
            let filteredCitas = [];
            if (userRole === 'paciente') {
              filteredCitas = result.data.filter(cita => cita.idPaciente == userId);
            } else if (userRole === 'medico') {
              filteredCitas = result.data.filter(cita => cita.idMedico == userId);
            }
            setCitas(filteredCitas);
          }
        } catch (error) {
          console.error("Error cargando citas:", error);
        }
      }
      setCargando(false);
    };
    cargarDatos();
  },[userRole, userId]);

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
         <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }}
          style={styles.photo}
        />
        <Text style={styles.errorText}>
          {userRole === 'paciente' ? texts.patientProfile : userRole === 'medico' ? 'Perfil de medico' : 'Perfil de Administrador'}
        </Text>
        <Text style={styles.status}>
          {userRole === 'paciente' ? texts.activePatient : userRole === 'Administrador' ? ' Médico Activo 🩺' : 'Administrador 👑 '}
        </Text>
      </View>
    
      {/* ================= DATOS PERSONALES ================= */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.personalData}</Text>
         <View style={styles.containerPerfil}>
        <Text style={styles.label}>👤Nombre: {usuario.user.name || "No disponible"}</Text>
        <Text style={styles.label}>📧Correo: {usuario.user.Email || "No disponible"}</Text>
        <Text style={styles.label}>📞Teléfono: {usuario.user.Telefono || "No disponible"}</Text>
        {userRole === 'paciente' && (
          <>
            <Text style={styles.label}>📅Fecha de Nacimiento: {usuario.user.Fecha_nacimiento || "No disponible"}</Text>
            <Text style={styles.label}>♉Género: {usuario.user.Genero || "No disponible"}</Text>
            <Text style={styles.label}>❤️RH: {usuario.user.RH || "No disponible"}</Text>
            <Text style={styles.label}>🌍Nacionalidad: {usuario.user.Nacionalidad || "No disponible"}</Text>
          </>
        )}
        {userRole === 'medico' && (
          <>
            <Text style={styles.label}>🏥ID Consultorio: {usuario.user.idConsultorio || "No disponible"}</Text>
            <Text style={styles.label}>🩺ID Especialidad: {usuario.user.idEspecialidad || "No disponible"}</Text>
          </>
        )}

      </View>
     </View>

     {/* ================= CITAS ================= */}
     {(userRole === 'paciente' || userRole === 'medico') && (
       <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text }]}>Mis Citas</Text>
         <FlatList
           data={citas}
           keyExtractor={(item) => item.id.toString()}
           renderItem={({ item }) => (
             <CitaCard
               cita={item}
               onPress={() => {}}
             />
           )}
           ListEmptyComponent={<Text style={[styles.empty, { color: colors.text }]}>No hay citas registradas</Text>}
         />
       </View>
     )}

   
 </View>

     
 
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
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
