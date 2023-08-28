import { View, StyleSheet } from "react-native";
import SmallTitle from "./UI/SmallTitle";

const HuntStatus = ({ name }) => {
   return (
      <>
         <View style={styles.huntsContainer}>
            <SmallTitle>Active Hunts</SmallTitle>
            <SmallTitle>Planned hunts</SmallTitle>
            <SmallTitle>Medals</SmallTitle>
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