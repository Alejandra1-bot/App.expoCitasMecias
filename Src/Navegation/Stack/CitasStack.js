import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarCitas from "../../../Screen/Citas/listarCitas";
import DetalleCita from "../../../Screen/Citas/detalleCita";
import EditaCita from "../../../Screen/Citas/editarCita";

const Stack = createNativeStackNavigator();   

export default function PacientesStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarCitas"
                component={ListarCitas}   
                options={{ title: 'citas' }}
            />
            <Stack.Screen       
                name="DetalleCita"
                component={DetalleCita}   
                options={{ title: 'Detalle de  cita'}}      
            />
            <Stack.Screen       
                name="EditarCita"        
                component={EditaCita}   
                options={{ title: 'Editar cita' }}      
            />
        </Stack.Navigator>
    );
}
