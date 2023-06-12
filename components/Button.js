import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
   const { onPress, title = 'Save' } = props;
   return (
      <Pressable style={styles.container} onPress={onPress}>
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#00cac6',
      borderRadius: 10,
      width: 200

   },
   text: {
      fontSize: 16,
      color: 'white',
      fontWeight: "bold",
      alignSelf: "center",
      margin: 10,
   }

})