import { View, StyleSheet, Text } from "react-native";
import FontLoader from "./FontLoader";
import Colors from "../../constants/Colors";

const Title = ({ children }) => {
   return (
      <FontLoader>
         <Text style={styles.title}>{children}</Text>
      </FontLoader>
   )
}

styles = StyleSheet.create({
   title: {
      fontFamily: 'NerkoOne_400Regular',
      fontSize: 40,
      color: Colors.mainWhite,
      alignSelf: 'center',
      marginBottom: 20
   }
})

export default Title;