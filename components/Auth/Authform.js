import { View, StyleSheet } from 'react-native';
import Input from './Input.js';

const AuthForm = () => {

   const emailHandler = () => {
      console.log('Email')
   }
   const passwordHandler = () => {
      console.log('password')
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
               keyboardType: 'password-address',
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

