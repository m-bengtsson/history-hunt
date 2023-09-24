import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HuntItem = ({ name, estimatedTime }) => {
   return (
      <View style={styles.container}>
         <View style={styles.huntIcon}>
            <Ionicons name="compass-outline" size={40} color={Colors.chocolate} />
         </View>
         <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{estimatedTime}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      backgroundColor: "#577bc3",
      borderRadius: 12,
      marginVertical: 4
   },
   textContainer: {
      flexDirection: "column",
      marginVertical: 5,
      marginHorizontal: 20,
   },
   title: {
      fontFamily: "nerko",
      color: Colors.mainWhite,
      fontSize: 21,
   },
   text: {
      fontFamily: "Arial",
      color: Colors.mainWhite,
      fontSize: 16,
   },
   huntIcon: {
      margin: 8,
      backgroundColor: Colors.darkOrange,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      height: 45,
      width: 45,
   },
});

export default HuntItem;
