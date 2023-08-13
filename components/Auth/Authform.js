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

   const {
      email: emailIsInvalid,
      confirmEmail: emailsDontMatch,
      password: passwordIsInvalid,
      confirmPassword: passwordsDontMatch,
   } = credentialsValidity;


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
   };

   const submitHandler = () => {
      onSubmit({
         email: enteredEmail,
         confirmEmail: enteredConfirmEmail,
         password: enteredPassword,
         confirmPassword: enteredConfirmPassword,
      });
   };

   return (
      <View style={styles.authContainer}>
         <Input
            label='Email'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: inputHandler.bind(this, 'email'),
               value: enteredEmail,
               isInvalid: emailIsInvalid

            }} />
         {!isLogin && (<Input
            label='Confirm Email Adress'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: inputHandler.bind(this, 'confirmEmail'),
               value: enteredConfirmEmail,
               isInvalid: emailsDontMatch

            }} />)}
         <Input
            label='Password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'password'),
               value: enteredPassword,
               isInvalid: passwordIsInvalid
            }} />

         {!isLogin && (<Input
            label='Confirm Password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'confirmPassword'),
               value: enteredConfirmPassword,
               isInvalid: passwordsDontMatch

            }} />)}
         <View style={styles.buttons}>
            <Button onPress={submitHandler}
               title={isLogin ? "Log In" : "Sign Up"}>
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

