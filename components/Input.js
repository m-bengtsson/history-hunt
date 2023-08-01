import { Text, View, StyleSheet } from "react-native"

const Input = ({ label, textInputConfig }) => {
   <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
   </View>
}

const styles = StyleSheet.create({

})

export default Input;
