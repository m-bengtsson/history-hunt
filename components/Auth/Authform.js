import { View, StyleSheet } from 'react-native';
import Input from './Input.js';

const Authform = () => {

   const emailHandler = () => {
      console.log('Email')
   }

   return (
      <View style={styles.authContainer}>
         <Input label='Email' textInputConfig={{
            keyboardType: 'email-address',
            onChangeText: emailHandler
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
export default Authform;

