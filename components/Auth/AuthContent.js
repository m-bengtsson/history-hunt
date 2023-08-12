import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


import AuthForm from "./AuthForm";
import Colors from "../../constants/Colors";
import TextButton from "../UI/TextButton";

const AuthContent = ({ isLogin, onAuthenticate }) => {

   const [credentialsValidity, setCredentialsValidity] = useState({ // single state handling multiple properties (user credentials)
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
   });

   // Submit handling user credentials
   const submitHandler = (credentials) => {
      //Destrukturera credentials
      // Implement validering såsom trimmning, tomma fält osv
      // Kolla om epost och lösen matchar
      // onAuthenticate({ email, password })
      let { email, confirmEmail, password, confirmPassword } = credentials;

   }
   const switchAuthMode = () => {
      console.log('switch mode')
   }
   return (
      <View style={styles.authContent}>
         <View style={styles.iconContainer}>
            <Ionicons name='ios-earth' size={100} color={Colors.mainWhite} />
         </View>
         <Text>History Hunt</Text>
         <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsValidity={credentialsValidity} />
         <View>
            <TextButton onPress={switchAuthMode} title={isLogin ? "Create new account" : "Log in instead"} />
         </View>
      </View>
   )

}

const styles = StyleSheet.create({
   authContent: {
      marginTop: 200,
      padding: 40,
      backgroundColor: Colors.trueBlue,
   },
   iconContainer: {
      alignSelf: 'center'
   },
   buttons: {
      marginTop: 8,
   },
});

export default AuthContent;