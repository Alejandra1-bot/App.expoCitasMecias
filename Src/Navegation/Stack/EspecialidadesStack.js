import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarEspecialidades from "../../../Screen/Especialidades/listarEspecialidades";
import DetalleEspecialidad from "../../../Screen/Especialidades/detalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidades/editarEspecialidad";

const Stack = createNativeStackNavigator();   

export default function PacientesStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarEspecialidades"
                component={ListarEspecialidades}   
                options={{ title: 'Especialidades' }}
            />
            <Stack.Screen       
                name="DetalleEspecialidad"
                component={DetalleEspecialidad}   
                options={{ title: 'Detalle de  Especialidad '}}      
            />
            <Stack.Screen       
                name="EditarEspecialidad"        
                component={EditarEspecialidad}   
                options={{ title: 'Editar Especialidad' }}      
            />
        </Stack.Navigator>
    );
}
