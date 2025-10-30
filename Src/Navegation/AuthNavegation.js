import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/Login";
import Registro from "../../Screen/Auth/Registro";
import RecuperarContrasena from "../../Screen/Auth/RecuperarContrasena";
import VerificarCodigo from "../../Screen/Auth/VerificarCodigo";
import ResetPassword from "../../Screen/Auth/ResetPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavegation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Iniciar Sesion'}}
           />

              <Stack.Screen
                name="Registro"
                component={Registro}
                options={{ title: 'Registro de Usuarios'}}
             />

             <Stack.Screen
               name="RecuperarContrasena"
               component={RecuperarContrasena}
               options={{ title: 'Recuperar Contraseña'}}
             />

             <Stack.Screen
               name="VerificarCodigo"
               component={VerificarCodigo}
               options={{ title: 'Verificar Código'}}
             />

             <Stack.Screen
               name="ResetPassword"
               component={ResetPassword}
               options={{ title: 'Restablecer Contraseña'}}
             />
        </Stack.Navigator>
    )
}