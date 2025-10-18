  import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  {SafeAreaView} from 'react-native-safe-area-context';
import AppNavegacion from './Src/Navegation/AppNavegacion';
import * as   Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { AppProvider } from "./Screen/Configuracion/AppContext";
import FlashMessage from "react-native-flash-message"
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  // le vamos a decir como vamos a mostrar las notificaciones cuando la app este en primer plano
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true, // muestra notificacion como banner en la parte superior

        shouldPlaySound: true, // nos va a sonar el celular cuando llega la notificacion
        shouldShowList: true,
        // shouldSetBadge: false, // No cambia icono de notificaion
      }),
    });

     const getPermisos = async () => {
      const { status } = Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permisos de notificaciones ');
      }
     }

     getPermisos();
  }, []);


  return (
   < GestureHandlerRootView >
    <AppProvider>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
      <AppNavegacion/>
    </AppProvider>
    </GestureHandlerRootView>
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
