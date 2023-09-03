import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import AuthFormUser from "./AuthFormUser";
import Colors from "../../constants/Colors";
import TextButton from "../UI/TextButton";


const AuthContent = ({ isLogin, onAuthenticate }) => {
   const navigate = useNavigation();

   const [credentialsValidity, setCredentialsValidity] = useState({
      // Single state handling multiple properties (user credentials)
      displayName: false,
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
      let { displayName, email, confirmEmail, password, confirmPassword } = credentials;
      // Trim email and password inputs
      email = email.trim();
      password = password.trim();

      // Validate email and password inputs
      const displayNameIsValid = displayName.lenth > 0;
      const emailIsValid = email.includes("@");
      const passwordIsValid = password.length > 6;
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
            displayName: displayNameIsValid,
            email: !emailIsValid,
            confirmEmail: !emailIsValid || !emailsAreEqual,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
         });

         // Exit the function
         return;
      }
      onAuthenticate({ displayName, email, password });
   };


   return (
      <View style={[styles.authContent, !isLogin && styles.authContentSignup]}>
         <View style={styles.iconContainer}>
            <Ionicons name='ios-earth' size={150} color={Colors.darkerBlue} />
         </View>
         <Text style={styles.iconContainer}>History Hunt</Text>
         <AuthFormUser
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
   authContentSignup: {
      marginTop: 80
   },
   iconContainer: {
      alignSelf: 'center',
      color: Colors.mainWhite,
      fontFamily: 'nerko',
      fontSize: 38
   },
   buttons: {
      marginTop: 8,
   },
});

export default AuthContent;