import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import CardComponents from "../../components/CardComponents";

export default function Inicio() {
  return (
    <ScrollView>
      <View style={styles.gridContainer}>
        
        <CardComponents
          tittle="Pacientes"
          description="Gestión de pacientes."
          icon="person-outline"
        />

        <CardComponents
          tittle="Médicos"
          description="Gestión de médicos."
          icon="medkit-outline"
        />

        <CardComponents
          tittle="Consultorios"
          description="Gestión de consultorios."
          icon="business-outline"
        />

        <CardComponents
          tittle="Especialidades"
          description="Gestión de especialidades médicas."
          icon="list-outline"
        />

        <CardComponents
          tittle="Recepcionistas"
          description="Gestión de recepcionistas."
          icon="people-outline"
        />

        <CardComponents
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
