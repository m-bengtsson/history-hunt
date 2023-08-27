import { View, StyleSheet } from "react-native";
import Title from "./UI/Title";

const HuntStatus = ({ name }) => {
   return (
      <>
         <View style={styles.huntsContainer}>
            <Title>Active Hunts</Title>
            <Title>Planned hunts</Title>
            <Title>Medals</Title>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   huntsContainer: {
      alignItems: 'flex-start',

   },
});

export default HuntStatus;