import { NavigationContainer } from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation";
import NavegacionPrincipal from "./NavegacionPrincipal";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function AppNavegacion(){
    const { isAuthenticated } = useAppContext();

    return(
        <NavigationContainer>
           {isAuthenticated ? <NavegacionPrincipal/> : <AuthNavegation/>}
        </NavigationContainer>
    );
}