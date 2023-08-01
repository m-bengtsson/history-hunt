import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";

import Button from "../components/Button";

const SignupScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   return (
      <View style={styles.container}>
         <Text style={styles.title}>History Hunt</Text>
         <Text style={styles.loginText}>Sign Up</Text>
         <View style={styles.inputContainer}>
            <TextInput style={styles.textInput}
               placeholder="Email"
               onChangeText={userEmail => setEmail(userEmail)}
               defaultValue={email} />
            <TextInput style={styles.textInput}
               placeholder="Password"
               onChangeText={userPassword => setPassword(userPassword)}
               defaultValue={password} />
         </View>
         <Button title='Continue' />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      borderColor: 'blue',
      borderStyle: 'dashed',
      borderWidth: 2
   },
   inputContainer: {
      margin: 10,
      width: 200,
      borderColor: 'blue',
      borderStyle: 'dashed',
      borderWidth: 2
   },
   title: {
      fontSize: 30,
      margin: 20,
   },
   loginText: {
      margin: 20,

   },
   textInput: {
      margin: 20,

   }
})

export default SignupScreen;