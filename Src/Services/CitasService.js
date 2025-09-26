import api from "./Conexion";

//  Listar todas las citas
export const listarCitas = async () => {
  try {
    const response = await api.get("/listarCitas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar citas:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ✅ Eliminar cita por ID
export const eliminarCita = async (id) => {
  try {
    await api.delete(`/eliminarCitas/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ✅ Crear nueva cita
export const crearCita = async (data) => {
  try {
    const response = await api.post("/CrearCitas", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ✅ Editar cita existente
export const editarCita = async (id, data) => {
  try {
    const response = await api.put(`/actualizarCitas/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar la cita:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
