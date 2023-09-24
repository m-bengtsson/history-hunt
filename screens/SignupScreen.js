import { ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";

const SignupScreen = () => {
   const [isAuthenticating, setIsAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext);
   const photoUrl = "";

   const authenticationHandler = async ({ displayName, email, password }) => {
      setIsAuthenticating(true);
      try {
         const token = await http.signupUser(email, password);
         authCtx.authenticate(token);
         await http.updateUser(displayName, photoUrl, token);
         await http.storeUsers({ name: displayName, email, photoUrl: photoUrl });
      } catch (error) {
         console.log(error);
         Alert.alert("Wrong credentials");
      }
      setIsAuthenticating(false);
   };

   if (isAuthenticating) {
      return <LoadingOverlay message={"Authenticating user..."} />;
   }

   return (
      <ScrollView>
         <KeyboardAvoidingView
            style={styles.keyboardViewContainer}
            behavior={Platform.OS === "ios" ? "padding" : null}
         >
            <AuthContent onAuthenticate={authenticationHandler} />
         </KeyboardAvoidingView>
      </ScrollView>
   );
};

export default SignupScreen;
