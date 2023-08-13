import { ScrollView } from "react-native";
import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";


// Rendering the Authcontent
const SignupScreen = () => {
   // loading auth??
   const [isAuthenticating, setIsAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext);
   const authenticationHandler = async ({ email, password }) => {
      setIsAuthenticating(true);
      try {
         const token = await http.signupUser(email, password);
         authCtx.authenticate(token);
      } catch (error) {
         console.log(error);
         Alert.alert('Wrong credentials');
      }
      setIsAuthenticating(false);
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