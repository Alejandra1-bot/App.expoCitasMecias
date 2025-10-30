import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarAdministradores from "../../../Screen/Administradores/listarAdministradores"
import EditarAdministrador from "../../../Screen/Administradores/editarAdministrador"
import DetalleAdministrador from "../../../Screen/Administradores/detalleAdministrador"


const  Stack = createNativeStackNavigator();

export default function AdministradoresStack(){
    return(
        <Stack.Navigator>
        <Stack.Screen
            name="ListarAdministradores"
            component={ListarAdministradores}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="EditarAdministrador"
            component={EditarAdministrador}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="DetalleAdministrador"
            component={DetalleAdministrador}
            options={{ headerShown: false }}
        />

        </Stack.Navigator>

    );
}