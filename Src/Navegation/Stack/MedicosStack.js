import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarMedicos from "../../../Screen/Medicos/listarMedicos";
import DetalleMedico from "../../../Screen/Medicos/detalleMedico";
import EditarMedico from "../../../Screen/Medicos/editarMedico";

const Stack = createNativeStackNavigator();   

export default function MeedicosStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarMedicos"
                component={ListarMedicos}   
                options={{ title: 'Medicos' }}
            />
            <Stack.Screen       
                name="DetalleMedico"
                component={DetalleMedico}   
                options={{ title: 'Detalle de  Medico'}}      
            />
            <Stack.Screen       
                name="EditarMedico"        
                component={EditarMedico}   
                options={{ title: 'Editar Medico' }}      
            />
        </Stack.Navigator>
    );
}
