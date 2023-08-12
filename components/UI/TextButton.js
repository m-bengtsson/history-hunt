import { Text, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/Colors';

const TextButton = (props) => {
   const { onPress, title } = props;
   return (
      <Pressable onPress={onPress}>
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({

   text: {
      fontSize: 16,
      color: Colors.mainWhite,
      fontWeight: "bold",
      alignSelf: "center",
      margin: 10,
   }

})

export default TextButton;