import { ScrollView, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";


// Rendering the Authcontent
const SignupScreen = () => {
   // loading auth??
   const [isAuthenticating, setIsAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext)

   const authenticationHandler = async ({ displayName, email, password }) => {
      useEffect(() => {

      }, [])
      setIsAuthenticating(true);
      try {
         const token = await http.signupUser(email, password);
         // console.log('respone token', token)
         authCtx.authenticate(token);
         //console.log('token', authCtx.token)
         const resp = await http.updateUser(displayName, token);
         //console.log('update user resp', resp)
         authCtx.testId(resp)

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