import { Text, View, StyleSheet, TextInput } from "react-native"
import Colors from "../../constants/Colors";

const Input = ({ label, textInputConfig }) => {
   return (
      <View style={styles.inputContainer}>
         <Text style={styles.label}>
            {label}
         </Text>
         <TextInput style={styles.input} {...textInputConfig}
         /* autoCapitalize="none"
         keyboardType={keyboardType}
         secureTextEntry={secure}
         onChangeText={onUpdateValue}
         value={value} */
         />
      </View>
   )
}

const styles = StyleSheet.create({
   inputContainer: {
      marginVertical: 16,

   },
   label: {
      color: Colors.mainWhite,
      marginBottom: 6,
      marginLeft: 6,
/*       fontFamily: 'NerkoOne-Regular'
 */   },
   input: {
      padding: 16,
      backgroundColor: Colors.trueBlue,
      borderColor: Colors.mainWhite,
      borderWidth: 2,
      borderRadius: 25,
      fontSize: 16,
      color: Colors.mainWhite
   },
});


export default Input;
