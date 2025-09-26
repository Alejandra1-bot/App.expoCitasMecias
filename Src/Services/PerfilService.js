// Src/Services/PerfilService.js
import axios from "axios";

const API_URL = "http://192.168.101.78:8000/api/perfil"; // cambia a la ruta real de tu backend

// ✅ Obtener perfil del usuario autenticado
export const obtenerPerfil = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return {
      success: false,
      message: error.response?.data?.message || "No se pudo obtener el perfil",
    };
  }
};

// ✅ Editar perfil del usuario
export const editarPerfil = async (perfilData) => {
  try {
    const response = await axios.put(`${API_URL}`, perfilData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar perfil:", error);
    return {
      success: false,
      message: error.response?.data?.message || "No se pudo actualizar el perfil",
    };
  }
};

// ✅ Cambiar contraseña
export const cambiarPassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    return {
      success: false,
      message: error.response?.data?.message || "No se pudo cambiar la contraseña",
    };
  }
};
