import { Text, View, StyleSheet, TextInput } from "react-native"

import Colors from "../../constants/Colors";


const Input = ({ label, textInputConfig }) => {
   const { isInvalid } = textInputConfig;
   return (
      <View style={styles.inputContainer}>
         <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
            {label}
         </Text>
         <TextInput style={[styles.input, isInvalid && styles.inputInvalid]} {...textInputConfig}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   inputContainer: {
      marginBottom: 16,

   },
   label: {
      color: Colors.mainWhite,
      marginBottom: 8,
      marginLeft: 20,
      fontFamily: 'NerkoOne_400Regular',
      fontSize: 16,

   },
   labelInvalid: {
      color: 'red'
   },
   input: {
      padding: 16,
      backgroundColor: Colors.trueBlue,
      borderColor: Colors.mainWhite,
      borderWidth: 2,
      borderRadius: 25,
      fontSize: 16,
      color: Colors.mainWhite
   },
   inputInvalid: {
      backgroundColor: 'pink'
   }
});


export default Input;
