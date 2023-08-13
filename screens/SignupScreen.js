import { ScrollView } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";

// Rendering the Authcontent
const SignupScreen = () => {
   const authenticationHandler = ({ email, password }) => {
      http.signupUser(email, password)
   }
   return (
      <ScrollView>
         <AuthContent onAuthenticate={authenticationHandler} />
      </ScrollView>
   )
}

export default SignupScreen;