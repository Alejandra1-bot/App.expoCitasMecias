import { NavigationContainer } from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation";
import NavegacionPrincipal from "./NavegacionPrincipal";
import { useAppContext } from "../../Screen/Configuracion/AppContext";
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export default function AppNavegacion(){
    const { isAuthenticated } = useAppContext();

    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                AuthNavegation: {
                    screens: {
                        ResetPassword: 'reset-password'
                    }
                }
            }
        }
    };

    return(
        <NavigationContainer linking={linking}>
           {isAuthenticated ? <NavegacionPrincipal/> : <AuthNavegation/>}
        </NavigationContainer>
    );
}