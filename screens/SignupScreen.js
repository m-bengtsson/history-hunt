import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import AuthForm from "../components/Auth/AuthForm";

const SignupScreen = () => {
   /* const navigate = useNavigation()
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigateToLogin = () => {
      navigate.replace('LoginScreen')
   } */

   return (
      <View style={styles.container}>
         <AuthForm />

         {/*          <Text style={styles.title}>History Hunt</Text>
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
         <Pressable onPress={navigateToLogin}>
            <Text>
               I want to login instead
            </Text>
         </Pressable> */}
      </View>
   )
}

const styles = StyleSheet.create({
   /*    container: {
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
   
      } */
})

export default SignupScreen;