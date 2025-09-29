import React, { createContext, useState, useContext } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Alterna entre claro y oscuro
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);