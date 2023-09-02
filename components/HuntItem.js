import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";

const HuntItem = ({ name, estimatedTime }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.text} >{name}</Text>
         <Text>{estimatedTime}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column'

   },
   text: {
      fontFamily: "NerkoOne_400Regular",
      color: Colors.mainWhite,

   }
});

export default HuntItem;