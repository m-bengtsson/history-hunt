import { View, Text, Pressable } from "react-native";
import { useState } from "react";

import AuthForm from "./AuthForm";

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
   return (
      <View>
         <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsValidity={credentialsValidity} />
         <View>
            <Pressable >
               <Text>{isLogin ? "Create new account" : "Log in instead"}</Text></Pressable>
         </View>
      </View>
   )

}

export default AuthContent;