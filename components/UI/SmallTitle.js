import { Text, StyleSheet } from "react-native"

const SmallTitle = ({ children }) => {
   return (
      <Text style={styles.textStyle}>{children}</Text>
   )
}

const styles = StyleSheet.create({
   textStyle: {
      fontFamily: 'NerkoOne_400Regular',
      fontSize: 20,
      color: Colors.mainWhite,
      alignSelf: 'center',
      marginBottom: 10
   }
})

export default SmallTitle