import api from "./Conexion";

// Listar administradores
export const listarAdministradores = async () => {
  try {
    const response = await api.get("/listarAdministradores");
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al listar administradores:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Eliminar administrador
export const eliminarAdministrador = async (id) => {
  try {
    await api.delete(`/eliminarAdministradores/${id}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error al eliminar el administrador:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Crear administrador
export const crearAdministrador = async (data) => {
  try {
    const response = await api.post("/CrearAdministradores", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al crear el administrador:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Editar administrador
export const editarAdministrador = async (id, data) => {
  try {
    const response = await api.put(`/actualizarAdministradores/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al editar el administrador:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};