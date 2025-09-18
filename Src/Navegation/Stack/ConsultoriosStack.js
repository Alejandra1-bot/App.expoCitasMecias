import { createNativeStackNavigator} from '@react-navigation/native-stack'
import ListarConsultorios from "../../../Screen/Consultorios/listarConsultorios";
import DetalleConsultorio from "../../../Screen/Consultorios/detalleConsultorios";
import EditarConsultorio from "../../../Screen/Consultorios/editarConsultorio";

const Stack = createNativeStackNavigator();   

export default function ConsultoriosStack(){
    return(
        <Stack.Navigator>   
            <Stack.Screen
                name="ListarConsultorios"
                component={ListarConsultorios}   
                options={{ title: 'Conusltorios' }}
            />
            <Stack.Screen       
                name="DetalleConsultorio"
                component={DetalleConsultorio}   
                options={{ title: 'Detalle de  consultorio'}}      
            />
            <Stack.Screen       
                name="EditarConsultorio"        
                component={EditarConsultorio}   
                options={{ title: 'Editar consultorio' }}      
            />
        </Stack.Navigator>
    );
}
