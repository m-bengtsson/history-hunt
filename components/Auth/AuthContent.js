import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import AuthFormUser from "./AuthFormUser";
import Colors from "../../constants/Colors";
import TextButton from "../UI/TextButton";
import Logo from "../UI/Logo";

const AuthContent = ({ isLogin, onAuthenticate }) => {
   const navigate = useNavigation();

   const [credentialsValidity, setCredentialsValidity] = useState({
      displayName: false,
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false,
   });

   const switchAuthMode = () => {
      if (isLogin) {
         navigate.replace("SignupScreen");
      } else {
         navigate.replace("LoginScreen");
      }
   };
   // Submit user credentials
   const submitHandler = (credentials) => {
      let { displayName, email, confirmEmail, password, confirmPassword } =
         credentials;
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
      ) {
         Alert.alert("Invalid input", "Please check your entered credentials.");
         setCredentialsValidity({
            displayName: displayNameIsValid,
            email: !emailIsValid,
            confirmEmail: !emailIsValid || !emailsAreEqual,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
         });
         return;
      }
      onAuthenticate({ displayName, email, password });
   };

   return (
      <View style={[styles.authContent, !isLogin && styles.authContentSignup]}>
         <Logo />
         <AuthFormUser
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsValidity={credentialsValidity}
         />
         <View>
            <TextButton
               onPress={switchAuthMode}
               title={isLogin ? "Create new account" : "Log in instead"}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   authContent: {
      marginTop: 200,
      padding: 40,
      backgroundColor: Colors.trueBlue,
   },
   authContentSignup: {
      marginTop: 80,
   },
   buttons: {
      marginTop: 8,
   },
});

export default AuthContent;
