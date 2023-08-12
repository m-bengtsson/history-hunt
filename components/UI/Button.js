import { Text, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

export default function Button(props) {
   const { onPress, title } = props;
   return (
      <Pressable style={styles.container} onPress={onPress}>
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.darkOrange,
      borderRadius: 25,
      padding: 16,
      marginTop: 12,

   },
   text: {
      fontSize: 18,
      color: Colors.chocolate,
      fontWeight: "bold",
      alignSelf: "center",

   }

})