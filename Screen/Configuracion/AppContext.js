import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


 export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("es"); // español por defecto
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Cargar tema, idioma, rol y token desde AsyncStorage al iniciar
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
        const savedToken = await AsyncStorage.getItem("userToken");
        const savedRole = await AsyncStorage.getItem("userRole");
        const savedUserId = await AsyncStorage.getItem("userId");
        if (savedToken) {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
        if (savedRole) {
          setUserRole(savedRole);
        }
        if (savedUserId) {
          setUserId(savedUserId);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  // Guardar tema en AsyncStorage cuando cambie
  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  // Cambiar idioma
  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem("language", newLanguage);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  // Función para login
  const login = async (token, role, userId) => {
    setToken(token);
    setUserRole(role);
    setUserId(userId);
    setIsAuthenticated(true);
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userRole", role);
      if (userId) await AsyncStorage.setItem("userId", userId.toString());
    } catch (error) {
      console.error("Error saving login data:", error);
    }
  };

  // Función para logout
  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Colores temáticos
  const colors = {
    light: {
      background: "#fff",
      text: "#000",
      card: "#f9fbff",
      primary: "#0a74da",
      secondary: "#0a18d6",
      danger: "#f20c0c",
      border: "#eee",
      tabBar: "#fefefe",
      tabBarActive: "#0A74DA",
      tabBarInactive: "#555",
    },
    dark: {
      background: "#222",
      text: "#fff",
      card: "#333",
      primary: "#0a74da",
      secondary: "#0a18d6",
      danger: "#f20c0c",
      border: "#444",
      tabBar: "#333",
      tabBarActive: "#0A74DA",
      tabBarInactive: "#aaa",
    },
  };

  const currentColors = colors[theme];

  // Textos según idioma
  const texts = {
    es: {
      appearance: "Apariencia",
      language: "Idioma",
      notifications: "Notificaciones",
      privacy: "Privacidad y Seguridad",
      help: "Ayuda y Soporte",
      logout: "Cerrar Sesión",
      light: "Claro",
      dark: "Oscuro",
      spanish: "Español",
      english: "Inglés",
      selectAppearance: "Selecciona el Tema",
      selectLanguage: "Selecciona el Idioma",
      generalOptions: "Opciones Generales",
      mainConfig: "Configuracion Principal",
      profile: "Perfil",
      viewAppointments: "Ver Citas",
      medicalHistory: "Historial Médico",
      editProfile: "Editar Perfil",
      newAppointment: "+ Nueva Cita",
      noAppointments: "No hay Citas Registradas",
      newOffice: "+Nuevo Consultorio",
      noOffices: "No hay Consultorios Registrados",
      patientProfile: "Perfil del Paciente",
      activePatient: "Paciente Activo 🏥",
      adminProfile: "Perfil de la Administradora",
      receptionistProfile: "Perfil de la Recepcionista",
      personalData: "Datos Personales",
      medicalInfo: "Información Médica",
      profileSettings: "Ajustes de Perfil",
    },
    en: {
      appearance: "Appearance",
      language: "Language",
      notifications: "Notifications",
      privacy: "Privacy and Security",
      help: "Help and Support",
      logout: "Log Out",
      light: "Light",
      dark: "Dark",
      spanish: "Spanish",
      english: "English",
      selectAppearance: "Select Theme",
      selectLanguage: "Select Language",
      generalOptions: "General Options",
      mainConfig: "Main Configuration",
      profile: "Profile",
      viewAppointments: "View Appointments",
      medicalHistory: "Medical History",
      editProfile: "Edit Profile",
      newAppointment: "+ New Appointment",
      noAppointments: "No Appointments Registered",
      newOffice: "+New Office",
      noOffices: "No Offices Registered",
      patientProfile: "Patient Profile",
      activePatient: "Active Patient 🏥",
      adminProfile: "Administrator Profile",
      receptionistProfile: "Receptionist Profile",
      personalData: "Personal Data",
      medicalInfo: "Medical Information",
      profileSettings: "Profile Settings",
    },
  };

  const currentTexts = texts[language];

  return (
    <AppContext.Provider value={{
      theme,
      setTheme: changeTheme,
      language,
      setLanguage: changeLanguage,
      userRole,
      setUserRole,
      userId,
      setUserId,
      isAuthenticated,
      token,
      login,
      logout,
      colors: currentColors,
      texts: currentTexts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);