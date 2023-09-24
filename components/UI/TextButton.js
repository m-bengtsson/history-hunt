import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../constants/Colors";

const TextButton = (props) => {
   const { onPress, title } = props;
   return (
      <Pressable
         style={({ pressed }) => (pressed ? styles.pressed : styles)}
         onPress={onPress}
      >
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   );
};

const styles = StyleSheet.create({
   pressed: {
      opacity: 0.5,
   },

   text: {
      textDecorationLine: "underline",
      fontSize: 20,
      color: Colors.mainWhite,
      fontWeight: "bold",
      alignSelf: "center",
      margin: 10,
      fontFamily: "nerko",
   },
});

export default TextButton;
