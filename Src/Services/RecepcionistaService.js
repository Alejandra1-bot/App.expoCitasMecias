import api from "./Conexion";

export const listarRecepcionistas = async () => {
  try {
    const response = await api.get("/listarResepcionistas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar recepcionistas:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};


export const eliminarRecepcionista = async (id) => {
  try {
    await api.delete(`/eliminarResepcionistas/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearRecepcionista = async (data) => {
  try {
    const response = await api.post("/CrearResepcionistas", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear el recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarRecepcionista = async (id, data) => {
  try {
    const response = await api.put(`/actualizarResepcionistas/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar el recepcionista:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
