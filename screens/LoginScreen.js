import { View, Alert } from "react-native";
import { useContext } from "react";
import { useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";

const LoginScreen = () => {
   const [isAuthenticating, setIsAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext);

   const authenticationHandler = async ({ email, password }) => {
      setIsAuthenticating(true);
      try {
         const token = await http.signinUser(email, password);
         authCtx.authenticate(token);
      } catch (error) {
         // Gör en overlay här
         Alert.alert('Incorrect e-mail or password')
      }
      setIsAuthenticating(false)
   };

   if (isAuthenticating) {
      return <LoadingOverlay message={'Loggin in user...'} />
   }

   return (
      <View >
         <AuthContent isLogin onAuthenticate={authenticationHandler} />
      </View>
   )
}

export default LoginScreen;