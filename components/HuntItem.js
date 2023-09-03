import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";

const HuntItem = ({ name, estimatedTime }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.title} >{name}</Text>
         <Text style={styles.text}>{estimatedTime}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      marginVertical: 5
   },
   title: {
      fontFamily: "nerko",
      color: Colors.mainWhite,
      fontSize: 21
   },
   text: {
      fontFamily: "Arial",
      color: Colors.mainWhite,
      fontSize: 16
   }

});

export default HuntItem;