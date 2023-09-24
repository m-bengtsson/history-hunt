import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../constants/Colors";

export default function Button(props) {
   const { onPress, title } = props;
   return (
      <Pressable
         style={({ pressed }) =>
            pressed ? [styles.container, styles.pressed] : styles.container
         }
         onPress={onPress}
      >
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.darkOrange,
      borderRadius: 25,
      padding: 12,
      marginTop: 12,
   },
   pressed: {
      opacity: 0.7,
   },
   text: {
      fontFamily: "nerko",
      fontSize: 26,
      color: Colors.chocolate,
      fontWeight: "bold",
      alignSelf: "center",
   },
});
