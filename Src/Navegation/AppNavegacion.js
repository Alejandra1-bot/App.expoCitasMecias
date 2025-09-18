import { NavigationContainer } from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation";
import NavegacionPrincipal from "./NavegacionPrincipal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef, use} from "react";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

export default function AppNavegacion(){
    const [isLoanding, setIsLoanding] = useState(true);
    const [userToken, setUserToken] = useState(true);
    const appState = useRef(AppState.currentState);

    const loandToken = async () =>{
        try{
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        }catch (error) {
            console.error("Error al cargar el token desde AyncStorage:", error);
        }finally{
            setIsLoanding(false);
        }
    };
    
    // se ejecuta cuando el componenete de monta  (( solo le ejecuta una sola vez))
    useEffect(() =>{
        loandToken();
    },[]);

     // se ejecuta cuando hay cambio de estado en la app (inactica/activa/Background)
    useEffect(() =>{
        const handleAppStateChange = (nextAppState)=>{
            if (appState.current.match(/inactive|background/) && nextAppState=== "active"){
                console.log ("La aplicacion ha vuelto a primer plano, verificando el Token...");
                loandToken();   
            }
             appState.current = nextAppState;
        };

        const subsCription = AppState.addEventListener("change", handleAppStateChange);
         return() => subsCription.remove();

    },[]);

     //se ejecuta en un intervalo de 2 segundos

     useEffect(() =>{
        const interval = setInterval(() =>{
            if (AppState.currentState === "active") {
                loandToken();    
            }
        }, 2000);
        return() => clearInterval(interval);
     },[]);


    return(
        <NavigationContainer>
           {userToken ? <NavegacionPrincipal/> : <AuthNavegation/>}
        </NavigationContainer>
    );
} 