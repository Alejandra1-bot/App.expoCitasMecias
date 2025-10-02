import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
import { crearMedico } from "./MedicoService";
import { crearPaciente } from "./PacienteService";
import { crearAdministrador } from "./AdministradorService";

export const loginUser= async(Email, password) => {
    try {
          const response = await api.post('/login', {email: Email, password});
          const token = response.data.token
          const role = response.data.user?.role || 'paciente'; // default to paciente
          const userId = response.data.user?.id;
          console.log("Respuesta del servidro:", response.data);
          console.log("Token recibido:", token);
          console.log("Rol recibido:", role);
          console.log("User ID recibido:", userId);
          if (token) {
             await AsyncStorage.setItem("userToken", token);
             await AsyncStorage.setItem("userRole", role);
             if (userId) await AsyncStorage.setItem("userId", userId.toString());
        }else{
            console.log("No se recibio el token en la respuesta");
        }
        return { success: true, token};
    }catch(error){
        console.error("Error al iniciar sesion:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data :"Error de Conexion",
        };
    }
};

export const registerUser = async (userData) => {
  try {
    const { roles, ...data } = userData;

    let response;
    if (roles === 'paciente') {
      const regResult = await api.post('/registrar', userData);
      if (regResult.success) {
        const userId = regResult.data.id;
        response = await crearPaciente({ ...data, idUsuario: userId });
      } else {
        response = regResult;
      }
    } else if (roles === 'medico') {
      const regResult = await api.post('/registrar', userData);
      if (regResult.success) {
        const userId = regResult.data.id;
        response = await crearMedico({ ...data, idUsuario: userId });
      } else {
        response = regResult;
      }
    } else if (roles === 'administrador') {
      const regResult = await api.post('/registrar', userData);
      if (regResult.success) {
        const userId = regResult.data.id;
        response = await crearAdministrador({ ...data, idUsuario: userId });
      } else {
        response = regResult;
      }
    } else {
      throw new Error("Rol no válido");
    }

    console.log("Respuesta del servidor (registro):", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al registrar usuario:", error.response ? error.response.data : error.message);

    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};


export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken"); //  elimina el token guardado
    await AsyncStorage.removeItem("userRole"); // elimina el rol guardado
    await AsyncStorage.removeItem("userId"); // elimina el userId guardado
    console.log("Sesión cerrada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: "Error al cerrar sesión" };
  }
};
