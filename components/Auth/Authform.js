import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import Input from './Input.js';

const AuthForm = () => {
   const [enteredEmail, setEnteredEmail] = useState("");
   const [enteredPassword, setEnteredPassword] = useState("");

   const emailHandler = (text) => {
      console.log('Email', text)
   }
   const passwordHandler = (text) => {
      console.log('password', text)
   }

   return (
      <View style={styles.authContainer}>
         <Input
            label='Email'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: emailHandler
            }} />
         <Input
            label='password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: passwordHandler
            }} />
      </View>
   )

}

const styles = StyleSheet.create({
   authContainer: {
      marginTop: 64,
      marginHorizontal: 32,
      padding: 16,
      borderRadius: 8,
      backgroundColor: 'pink',
      elevation: 2,
      shadowColor: "black",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
   },
})
export default AuthForm;

