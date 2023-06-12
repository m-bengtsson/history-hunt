import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   return (
      <View style={styles.container}>
         <Text style={styles.title}>History Hunt</Text>
         <Text style={styles.loginText}>Log in to your account</Text>
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
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
   },
   inputContainer: {
      marginVertical: 20,

   },
   title: {
      fontSize: 30,
      margin: 20
   },
   loginText: {
      margin: 20,
   },
   textInput: {
      margin: 20,
   }
})

export default LoginScreen;