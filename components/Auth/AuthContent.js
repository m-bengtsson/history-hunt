import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import AuthForm from "./AuthForm";
import Colors from "../../constants/Colors";
import TextButton from "../UI/TextButton";
import FontLoader from "../UI/FontLoader";


const AuthContent = ({ isLogin, onAuthenticate }) => {
   const navigate = useNavigation();

   const [credentialsValidity, setCredentialsValidity] = useState({
      // single state handling multiple properties (user credentials)
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false,
   });

   const switchAuthMode = () => {
      if (isLogin) {
         navigate.replace('SignupScreen');
      } else {
         navigate.replace('LoginScreen');
      }
   };
   // Submit handling user credentials
   const submitHandler = (credentials) => {
      // Destrukturera credentials
      // Implement validering såsom trimmning, tomma fält osv
      // Kolla om epost och lösen matchar
      // onAuthenticate({ email, password })
      // setCredentialsValidity
      let { email, confirmEmail, password, confirmPassword } = credentials;
      // Trim email and password inputs
      email = email.trim();
      password = password.trim();

      // Validate email and password inputs
      const emailIsValid = email.includes("@");
      const passwordIsValid = password.length > 6;

      // Check if email and password match (for signup)
      const emailsAreEqual = email === confirmEmail;
      const passwordsAreEqual = password === confirmPassword;

      // Perform input validation
      if (
         !emailIsValid ||
         !passwordIsValid ||
         (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
      ) {/////////////// ÄNDRING :TODO ÄNDRA TILL NÅGOT ANNAT Än ALERT
         Alert.alert("Invalid input", "Please check your entered credentials.");

         // Update credentialsInvalid state to reflect invalid inputs
         setCredentialsValidity({
            email: !emailIsValid,
            confirmEmail: !emailIsValid || !emailsAreEqual,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
         });

         // Exit the function
         return;
      }
      onAuthenticate({ email, password });
   };


   return (
      <FontLoader>
         <View style={[styles.authContent, !isLogin && styles.authContentSignup]}>
            <View style={styles.iconContainer}>
               <Ionicons name='ios-earth' size={100} color={Colors.darkerBlue} />
            </View>
            <Text style={styles.iconContainer}>History Hunt</Text>
            <AuthForm
               isLogin={isLogin}
               onSubmit={submitHandler}
               credentialsValidity={credentialsValidity} />
            <View>
               <TextButton onPress={switchAuthMode} title={isLogin ? "Create new account" : "Log in instead"} />
            </View>
         </View>
      </FontLoader>
   )

}

const styles = StyleSheet.create({
   authContent: {
      marginTop: 200,
      padding: 40,
      backgroundColor: Colors.trueBlue,
   },
   authContentSignup: {
      marginTop: 80
   },
   iconContainer: {
      alignSelf: 'center',
      color: Colors.mainWhite,
      fontFamily: 'NerkoOne_400Regular',
      fontSize: 38
   },
   buttons: {
      marginTop: 8,
   },
});

export default AuthContent;