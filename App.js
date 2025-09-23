import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavegacion from './Src/Navegation/AppNavegacion';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
   <>
      <StatusBar style="auto" />
        <FlashMessage position="top" />
      <AppNavegacion/>
    </>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2647',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
  },


});
