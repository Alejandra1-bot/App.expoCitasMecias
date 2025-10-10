// Src/Services/PerfilService.js
import api from "./Conexion";

// ✅ Obtener perfil del usuario autenticado
export const obtenerPerfil = async () => {
  try {
    const response = await api.get("/me");
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
    const response = await api.put("/me", perfilData);
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
    const response = await api.put("/me/password", passwordData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    return {
      success: false,
      message: error.response?.data?.message || "No se pudo cambiar la contraseña",
    };
  }
};
