import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  {useState} from "react";
import { useAppContext } from "../Configuracion/AppContext";
import { listarCitas } from "../../Src/Services/CitasService";
import { obtenerPerfil } from "../../Src/Services/PerfilService";
import { listarConsultorios } from "../../Src/Services/ConsultorioService";
import { listarEspecialidades } from "../../Src/Services/EspecialidadesService";
import { listarPacientes } from "../../Src/Services/PacienteService";
import { listarMedicos } from "../../Src/Services/MedicoService";
import { listarRecepcionistas } from "../../Src/Services/RecepcionistaService";
import CitaCard from "../../components/CitaCard";

export default function Perfil  ({navigation}) {
    const [usuario, setUsuario] = useState({});
    const [cargando, setCargando]= useState(true);
    const [citas, setCitas] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [recepcionistas, setRecepcionistas] = useState([]);
    const { colors, texts, userRole, userId } = useAppContext();

  useEffect(() =>{
    const cargarDatos = async () => {
      try {
        const perfilResult = await obtenerPerfil();
        if (perfilResult.success) {
          const userData = perfilResult.data?.data?.user || perfilResult.data?.user || perfilResult.data || {};
          setUsuario(userData);
        } else {
          setUsuario({});
        }

        // Obtener IDs específicos según rol
        if (userRole === 'paciente') {
          const pacientesResult = await listarPacientes();
          if (pacientesResult.success) {
            const paciente = pacientesResult.data.find(p => p.idUsuario == userId);
            if (paciente) {
              setUsuario(prev => ({ ...prev, idPaciente: paciente.id }));
            }
          }
        } else if (userRole === 'medico') {
          const medicosResult = await listarMedicos();
          const recepcionistasResult = await listarRecepcionistas();
          if (medicosResult.success) {
            const medico = medicosResult.data.find(m => m.idUsuario == userId);
            if (medico) {
              setUsuario(prev => ({ ...prev, idMedico: medico.id }));
            }
          }
          if (recepcionistasResult.success) {
            setRecepcionistas(recepcionistasResult.data);
          }
        } else if (userRole === 'recepcionista') {
          const recepcionistasResult = await listarRecepcionistas();
          if (recepcionistasResult.success) {
            const recepcionista = recepcionistasResult.data.find(r => r.idUsuario == userId);
            if (recepcionista) {
              setUsuario(prev => ({ ...prev, idResepcionista: recepcionista.id }));
            }
          }
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
        setUsuario({});
      }

      if (userRole === 'paciente' || userRole === 'medico' || userRole === 'recepcionista' || userRole === 'administrador') {
        try {
          const result = await listarCitas();
          if (result.success) {
            let filteredCitas = [];
            if (userRole === 'paciente') {
            filteredCitas = result.data;
            } else if (userRole === 'medico') {
              filteredCitas = result.data; // Mostrar todas para ver si hay citas
            } else if (userRole === 'recepcionista') {
              filteredCitas = result.data.filter(cita => cita.idResepcionista == parseInt(usuario.idResepcionista || userId));
            } else if (userRole === 'administrador') {
              filteredCitas = result.data; // Administrador ve todas las citas
            }
            setCitas(filteredCitas);
          }
        } catch (error) {
          console.error("Error cargando citas:", error);
        }
      }

      // Cargar listas para mostrar nombres en citas
      if (userRole === 'paciente') {
        try {
          const [medicosResult, recepcionistasResult] = await Promise.all([
            listarMedicos(),
            listarRecepcionistas()
          ]);
          if (medicosResult.success) {
            setMedicos(medicosResult.data);
            console.log("Medicos cargados:", medicosResult.data);
          }
          if (recepcionistasResult.success) {
            setRecepcionistas(recepcionistasResult.data);
            console.log("Recepcionistas cargados:", recepcionistasResult.data);
          }
        } catch (error) {
          console.error("Error cargando medicos y recepcionistas:", error);
        }
      } else if (userRole === 'medico') {
        try {
          const [pacientesResult, recepcionistasResult, consultoriosResult, especialidadesResult] = await Promise.all([
            listarPacientes(),
            listarRecepcionistas(),
            listarConsultorios(),
            listarEspecialidades()
          ]);
          if (pacientesResult.success) setPacientes(pacientesResult.data);
          if (recepcionistasResult.success) setRecepcionistas(recepcionistasResult.data);
          if (consultoriosResult.success) setConsultorios(consultoriosResult.data);
          if (especialidadesResult.success) setEspecialidades(especialidadesResult.data);
        } catch (error) {
          console.error("Error cargando listas:", error);
        }
      } else if (userRole === 'recepcionista' || userRole === 'administrador') {
        try {
          const [pacientesResult, medicosResult] = await Promise.all([
            listarPacientes(),
            listarMedicos()
          ]);
          if (pacientesResult.success) setPacientes(pacientesResult.data);
          if (medicosResult.success) setMedicos(medicosResult.data);
        } catch (error) {
          console.error("Error cargando pacientes y medicos:", error);
        }
      }
      setCargando(false);
    };
    cargarDatos();
  },[]);

  if (!usuario || Object.keys(usuario).length === 0) {
    return(
     <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.errorText}> Perfil de Usuario</Text>
      <View style={styles.containerPerfil}>
        <Text style={styles.errorText}> Cargando perfil...</Text>
      </View>
     </View>

    );

  }

  const renderHeader = () => (
    <>
      {/* ================= ENCABEZADO ================= */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }}
          style={styles.photo}
        />
        <Text style={styles.errorText}>
          {userRole === 'paciente' ? texts.patientProfile : userRole === 'medico' ? 'Perfil de medico' : userRole === 'administrador' ? 'Perfil de Administrador' : userRole === 'recepcionista' ? texts.receptionistProfile : texts.adminProfile}
        </Text>
        <Text style={styles.status}>
          {userRole === 'paciente' ? texts.activePatient : userRole === 'medico' ? ' Médico Activo 🩺' : userRole === 'administrador' ? 'Administrador 👑 ' : userRole === 'recepcionista' ? 'Recepcionista 📋' : 'Administradora 👑 '}
        </Text>
      </View>

      {/* ================= DATOS PERSONALES ================= */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{texts.personalData}</Text>
          <View style={styles.containerPerfil}>
         <Text style={styles.label}>👤 Nombre: {usuario.nombre || usuario.name || "No disponible"}</Text>
         <Text style={styles.label}>👤 Apellido: {usuario.Apellido || "No disponible"}</Text>
         <Text style={styles.label}>📄 Documento: {usuario.Documento || "No disponible"}</Text>
         <Text style={styles.label}>📧 Correo: {usuario.correo || usuario.email || "No disponible"}</Text>
         <Text style={styles.label}>📞 Teléfono: {usuario.telefono || "No disponible"}</Text>
         {(userRole === 'paciente' ) && (
           <>
             <Text style={styles.label}>📅 Fecha de Nacimiento: {usuario.fecha_nacimiento || "No disponible"}</Text>
             <Text style={styles.label}>♉ Género: {usuario.Genero || "No disponible"}</Text>
             <Text style={styles.label}>❤️ RH: {usuario.RH || "No disponible"}</Text>
             <Text style={styles.label}>🌍 Nacionalidad: {usuario.Nacionalidad || "No disponible"}</Text>
           </>
         )}
         {userRole === 'recepcionista' && (
           <Text style={styles.label}>🕒 Turno: {usuario.Turno || "No disponible"}</Text>
         )}
         {( userRole === 'medico') && (
           <>
             <Text style={styles.label}>🏥 Consultorio: {consultorios.find(c => c.id == usuario.idConsultorio)?.nombre || consultorios.find(c => c.id == usuario.idConsultorio)?.Nombre || usuario.idConsultorio || "No disponible"}</Text>
             <Text style={styles.label}>🩺 Especialidad: {especialidades.find(e => e.id == usuario.idEspecialidad)?.nombre || especialidades.find(e => e.id == usuario.idEspecialidad)?.Nombre || usuario.idEspecialidad || "No disponible"}</Text>
           </>
         )}

      </View>
      </View>
    </>
  );

  return(
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      {(userRole === 'paciente' || userRole === 'medico') && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mis Citas</Text>
          {citas.length > 0 ? (
            citas.map((item) => (
              <CitaCard
                key={item.id}
                cita={item}
                pacientes={pacientes}
                medicos={medicos}
                recepcionistas={recepcionistas}
                consultorios={consultorios}
                especialidades={especialidades}
                onEdit={() => navigation.navigate("EditarCita", { cita: item })}
                onDelete={() => {}}
                onPress={() => {}}
              />
            ))
          ) : (
            <Text style={[styles.empty, { color: colors.text }]}>No hay citas registradas</Text>
          )}
        </View>
      )}
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
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
