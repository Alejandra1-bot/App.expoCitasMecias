import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarRecepcionistas from "../../../Screen/Recepcionistas/listarRecepcionistas";
import DetalleRecepcionista from "../../../Screen/Recepcionistas/detalleRecepcionista";
import EditarRecepcionista from "../../../Screen/Recepcionistas/editarRecepcionista";

const Stack = createNativeStackNavigator();   

export default function PacientesStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarRecepcionistas"
                component={ListarRecepcionistas}   
                options={{ title: 'Recepcionistas' }}
            />
            <Stack.Screen       
                name="DetalleRecepcionista"
                component={DetalleRecepcionista}   
                options={{ title: 'Detalle de  Recepcionistas'}}      
            />
            <Stack.Screen       
                name="EditarRecepcionista"        
                component={EditarRecepcionista}   
                options={{ title: 'Editar Recepcionistas' }}      
            />
        </Stack.Navigator>
    );
}
