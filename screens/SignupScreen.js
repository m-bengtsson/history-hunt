import { ScrollView, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";


const SignupScreen = () => {

   const [isAuthenticating, setIsAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);

   const authenticationHandler = async ({ displayName, email, password }) => {
      setIsAuthenticating(true);
      try {
         const token = await http.signupUser(email, password);
         authCtx.authenticate(token);

         const resp = await http.updateUser(displayName, token);
         await http.storeUsers({ name: displayName, email })

         userCtx.addUser(displayName, email);

      } catch (error) {
         console.log(error)
         Alert.alert('Wrong credentials')
      }

      setIsAuthenticating(false)
   };


   if (isAuthenticating) {
      return <LoadingOverlay message={'Authenticating user...'} />
   }

   return (
      <ScrollView>
         <AuthContent onAuthenticate={authenticationHandler} />
      </ScrollView>
   )
}

export default SignupScreen;