import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const InviteCard = ({ name, email, isSelected, onSelect }) => {
   return (
      <View style={styles.container}>
         <Pressable onPress={() => onSelect(email)}>
            <View style={styles.card}>
               {isSelected ? (
                  <FontAwesome
                     style={styles.icon}
                     name="check-circle"
                     size={60}
                     color={Colors.lighterBlue}
                  />
               ) : (
                  <FontAwesome
                     style={styles.icon}
                     name="user-circle"
                     size={60}
                     color={Colors.lighterBlue}
                  />
               )}
               <Text style={styles.text}>{name}</Text>
            </View>
         </Pressable>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 10,
   },
   card: {
      width: 110,
      height: 110,
      padding: 10,
      backgroundColor: Colors.darkerBlue_2,
      borderRadius: 18,
      justifyContent: "center",
   },
   icon: {
      alignSelf: "center",
   },
   text: {
      color: Colors.mainWhite,
      fontSize: 16,
      alignSelf: "center",
      marginVertical: 0,
      fontFamily: "nerko",
   },
});

export default InviteCard;
