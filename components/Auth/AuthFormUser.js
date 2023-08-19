import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import Input from './Input.js';
import Button from '../UI/Button.js';
import Colors from '../../constants/Colors.js';

const AuthFormUser = ({ onSubmit, isLogin, credentialsValidity }) => {
   const [enteredName, setEnteredName] = useState("");
   const [enteredEmail, setEnteredEmail] = useState("");
   const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
   const [enteredPassword, setEnteredPassword] = useState("");
   const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

   const {
      displayName: displayNameIsInvalid,
      email: emailIsInvalid,
      confirmEmail: emailsDontMatch,
      password: passwordIsInvalid,
      confirmPassword: passwordsDontMatch,
   } = credentialsValidity;


   const inputHandler = (inputType, enteredValue) => {
      switch (inputType) {
         case 'name':
            setEnteredName(enteredValue);
            break;
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
         displayName: enteredName,
         email: enteredEmail,
         confirmEmail: enteredConfirmEmail,
         password: enteredPassword,
         confirmPassword: enteredConfirmPassword,
      });
   };

   return (
      <View style={styles.authContainer}>
         {!isLogin && (
            <Input
               label="Name"
               textInputConfig={{
                  keyboardType: 'default',
                  onChangeText: inputHandler.bind(this, 'name'),
                  value: enteredName,
                  isInvalid: displayNameIsInvalid,
                  autoCapitalize: 'words',
               }}
            />
         )}

         <Input
            label='Email'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: inputHandler.bind(this, 'email'),
               value: enteredEmail,
               isInvalid: emailIsInvalid,
               autoCapitalize: 'none'

            }} />
         {!isLogin && (<Input
            label='Confirm Email Adress'
            textInputConfig={{
               keyboardType: 'email-address',
               onChangeText: inputHandler.bind(this, 'confirmEmail'),
               value: enteredConfirmEmail,
               isInvalid: emailsDontMatch,

            }} />)}
         <Input
            label='Password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'password'),
               value: enteredPassword,
               isInvalid: passwordIsInvalid,
               // secureTextEntry: true

            }} />

         {!isLogin && (<Input
            label='Confirm Password'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'confirmPassword'),
               value: enteredConfirmPassword,
               isInvalid: passwordsDontMatch,
               // secureTextEntry: true

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
export default AuthFormUser;

