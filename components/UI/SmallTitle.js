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
      color: 'white'
   }
})

export default SmallTitle;