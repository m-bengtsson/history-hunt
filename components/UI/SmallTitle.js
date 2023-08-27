import { Text, StyleSheet } from "react-native"
import FontLoader from "./FontLoader"

const SmallTitle = ({ children }) => {
   return (
      <FontLoader>

         <Text style={styles.textStyle}>{children}</Text>
      </FontLoader>
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