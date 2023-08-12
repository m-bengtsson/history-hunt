import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import Input from './Input.js';
import Button from '../UI/Button.js';
import Colors from '../../constants/Colors.js';

const AuthForm = ({ onSubmit, isLogin, credentialsValidity }) => {
   const [enteredEmail, setEnteredEmail] = useState("");
   const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
   const [enteredPassword, setEnteredPassword] = useState("");
   const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");


   const submitHandler = () => {
      onSubmit({

      })

   }
   const inputHandler = (inputType, enteredValue) => {
      switch (inputType) {
         case "email":
            setEnteredEmail(enteredValue);
            break;
         case "confirmEmail":
            setEnteredConfirmEmail(enteredValue);
            break;
         case "password":
            setEnteredPassword(enteredValue);
            break;
         case "confirmPassword":
            setEnteredConfirmPassword(enteredValue);
            break;
      }
   }

   return (
      <View style={styles.authContainer}>
         <Input
            label='Email'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: inputHandler.bind(this, 'email')
            }} />
         <Input
            label='password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler
            }} />
         <View style={styles.buttons}>
            <Button onPress={submitHandler} title={isLogin ? "Log In" : "Sign Up"}>
            </Button>
         </View>
      </View>
   )

}

const styles = StyleSheet.create({
   authContainer: {
      marginTop: 14,
      backgroundColor: Colors.trueBlue,
   },
})
export default AuthForm;

