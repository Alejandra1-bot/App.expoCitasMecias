import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

export const loginUser= async(Email, password) => {
    try {
         const response = await api.post('/login', {Email, password});
         const token = response.data.token
         console.log("Respuesta del servidro:", response.data);
         console.log("Token recibido:", token);
         if (token) {
            await AsyncStorage.setItem("userToken", token);
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
    const response = await api.post('/registrar', userData); //  endpoint de el backend
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
    console.log("Sesión cerrada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: "Error al cerrar sesión" };
  }
};
