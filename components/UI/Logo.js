import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const Logo = () => {
   return (
      <View style={styles.iconContainer}>
         <MaterialCommunityIcons name="compass-outline" size={200} color={Colors.darkerBlue} />
         <View style={styles.textOnTop}>
            <Text style={styles.history}>History</Text>
            <Text style={styles.hunt}>Hunt</Text>
         </View>
      </View>

   );
};

const styles = StyleSheet.create({
   textOnTop: {
      position: "absolute",
      alignItems: "center",
      left: 10,
      top: 40

   },
   history: {
      fontFamily: "nerko",
      fontSize: 60,
      letterSpacing: 2,
      color: Colors.mainWhite,
      margin: 0,
      padding: 0

   },
   hunt: {
      fontFamily: "nerko",
      color: Colors.darkOrange,
      fontSize: 70,
      position: "absolute",
      top: 40

   },
   iconContainer: {
      alignSelf: "center",
      color: Colors.mainWhite,
      fontFamily: "nerko",
      fontSize: 38,
   },
});

export default Logo;
