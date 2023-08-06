import { Text, View, StyleSheet, TextInput } from "react-native"

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
      marginVertical: 8,
   },
   label: {
      color: "black",
      marginBottom: 4,
   },
   input: {
      paddingVertical: 8,
      paddingHorizontal: 4,
      backgroundColor: 'white',
      borderRadius: 4,
      fontSize: 16,
   },
});


export default Input;
