import { createNativeStackNavigator} from '@react-navigation/native-stack'
 import  Inicio from "../../../Screen/Inicio/inicio"
 import PacientesStack from './PacientesStack';
 import ConcultoriosStack from './ConsultoriosStack';
 import MedicosStack from './MedicosStack';
 import EspecialidadesStack from './EspecialidadesStack';
 import RecepcionistasStack from './RecepcionistasStack';
 import CitasStack from './CitasStack';


const  Stack = createNativeStackNavigator();

export default function InicioStack(){
    return(
        <Stack.Navigator>
        <Stack.Screen
            name="InicioPantalla"
            component={Inicio}   
            options={{ headerShown: false }}
        />

          <Stack.Screen
            name="PacientesFlow"
            component={PacientesStack}   
            options={{ headerShown: false }}
        />

        
          <Stack.Screen
            name="ConcultoriosFlow"
            component={ConcultoriosStack}   
            options={{ headerShown: false }}
        />

           <Stack.Screen
            name="MedicosFlow"
            component={MedicosStack}   
            options={{ headerShown: false }}
        />
           <Stack.Screen
            name="EspecialidadesFlow"
            component={EspecialidadesStack}   
            options={{ headerShown: false }}
        />
           <Stack.Screen
            name="RecepcionistasFlow"
            component={RecepcionistasStack}   
            options={{ headerShown: false }}
        />
           <Stack.Screen
            name="CitasFlow"
            component={CitasStack}   
            options={{ headerShown: false }}
        />
        </Stack.Navigator>

    );
}
