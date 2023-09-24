import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
const LogoButton = ({ onPress }) => {
   return (
      <Pressable onPress={onPress} style={styles.iconContainer}>
         <MaterialCommunityIcons name="compass-rose" size={70} color={Colors.darkerBlue} />
         <View style={styles.textOnTop}>
            <Text style={styles.history}>History</Text>
            <Text style={styles.hunt}>Hunt</Text>
         </View>
      </Pressable>
   );
};

const styles = StyleSheet.create({
   textOnTop: {
      position: "absolute",
      alignItems: "center",
      justifyContent: 'center',
      left: 7,
      top: 24

   },
   history: {
      fontFamily: "nerko",
      fontSize: 30,
      color: Colors.mainWhite,
   },
   hunt: {
      fontFamily: "nerko",
      color: Colors.darkOrange,
      fontSize: 35,
      position: "absolute",
      top: 18,

   },
   iconContainer: {
      alignSelf: "center",
      fontFamily: "nerko",
      alignItems: 'center',
      fontSize: 18,
      //backgroundColor: Colors.darkOrange,
      padding: 15,
      borderRadius: 100
   },
});

export default LogoButton;
