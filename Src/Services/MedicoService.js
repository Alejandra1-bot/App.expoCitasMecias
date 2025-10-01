import api from "./Conexion";

// Listar médicos
export const listarMedicos = async () => {
  try {
    const response = await api.get("/listarMedicos");
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al listar médicos:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Eliminar médico
export const eliminarMedico = async (id) => {
  try {
    await api.delete(`/eliminarMedicos/${id}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error al eliminar el médico:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Crear médico
export const crearMedico = async (data) => {
  try {
    const response = await api.post("/CrearMedicos", data);
    return { success: true, data: response.data };
  } catch (error) {
    // console.error(
    //   "Error al crear el médico:",
    //   error.response ? error.response.data : error.message
    // );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Editar médico
export const editarMedico = async (id, data) => {
  try {
    const response = await api.put(`/actualizarMedicos/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
      // console.error(
      //   "Error al editar el médico:",
      //   error.response ? error.response.data : error.message
      // );
      return {
        success: false,
        message: error.response ? error.response.data : "Error de conexión",
      };
  }
};
