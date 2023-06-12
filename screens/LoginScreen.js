import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Button from "../components/Button";

const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   return (
      <View style={styles.container}>
         <Ionicons name='ios-earth' size={100} color='blue' />
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
         <Button title='Continue' />
         <View>
            <Text>Don't already have an account?</Text>
            <Pressable><Text>Sign up here</Text></Pressable>
         </View>
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

export default LoginScreen;