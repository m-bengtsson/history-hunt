import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const SmallTitle = ({ children, ...rest }) => {
   return <Text style={[styles.textStyle, rest]}>{children}</Text>;
};
const styles = StyleSheet.create({
   textStyle: {
      fontFamily: "nerko",
      fontSize: 30,
      color: Colors.mainWhite,
      textAlign: 'center'
   },
});

export default SmallTitle;
