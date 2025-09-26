import api from "./Conexion";

//  Listar todas las especialidades
export const listarEspecialidades = async () => {
  try {
    const response = await api.get("/listarEspecialidades");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

//  Eliminar especialidad por ID
export const eliminarEspecialidad = async (id) => {
  try {
    await api.delete(`/eliminarEspecialidades/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

//  Crear nueva especialidad
export const crearEspecialidad = async (data) => {
  try {
    const response = await api.post("/CrearEspecialidades", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear la especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

//  Editar especialidad existente
export const editarEspecialidad = async (id, data) => {
  try {
    const response = await api.put(`/actualizarEspecialidades/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar la especialidad:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
