import { Text, StyleSheet } from "react-native"

const SmallTitle = ({ children, ...rest }) => {
   return (
      <Text style={[styles.textStyle, rest]}>{children}</Text>
   )
}

const styles = StyleSheet.create({
   textStyle: {
      fontFamily: 'nerko',
      fontSize: 30,
      alignSelf: 'center',
      marginBottom: 10,
      color: 'white'
   }
})

export default SmallTitle;