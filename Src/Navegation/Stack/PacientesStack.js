import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientes";
import DetallePaciente from "../../../Screen/Pacientes/detallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/editarPaciente";

const Stack = createNativeStackNavigator();   

export default function PacientesStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarPacientes"
                component={ListarPacientes}   
                options={{ title: 'Pacientes' }}
            />
            <Stack.Screen       
                name="DetallePaciente"
                component={DetallePaciente}   
                options={{ title: 'Detalle de  Paciente'}}      
            />
            <Stack.Screen       
                name="EditarPaciente"        
                component={EditarPaciente}   
                options={{ title: 'Editar Paciente' }}      
            />
        </Stack.Navigator>
    );
}
