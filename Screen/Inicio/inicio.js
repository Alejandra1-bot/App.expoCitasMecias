import { ScrollView, StatusBar} from "react-native";
import { View, StyleSheet } from "react-native";
import CardComponent from "../../components/CardComponent  ";

export default function Inicio() {
  return (
           <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>BIENVENIDOS</Text>
                <Text style={styles.Subtitle}>Estado <Text style={styles.StatusText}> Habilitado</Text></Text>
                <Text style={styles.Subtitle}>Selecciona una Opcion</Text>
             </View> 
             
      <View style={styles.gridContainer}>
        
        <CardComponent
          tittle="Pacientes"
          description="Gestión de pacientes."
          icon="person-outline"
        />

        <CardComponent
          tittle="Médicos"
          description="Gestión de médicos."
          icon="medkit-outline"
        />

        <CardComponent
          tittle="Consultorios"
          description="Gestión de consultorios."
          icon="business-outline"
        />

        <CardComponent
          tittle="Especialidades"
          description="Gestión de especialidades médicas."
          icon="list-outline"
        />

        <CardComponent
          tittle="Recepcionistas"
          description="Gestión de recepcionistas."
          icon="people-outline"
        />

        <CardComponent
          tittle="Citas"
          description="Gestión de citas médicas."
          icon="calendar-outline"
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
