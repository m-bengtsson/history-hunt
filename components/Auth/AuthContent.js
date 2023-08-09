import { View } from "react-native";

import AuthForm from "./AuthForm";

const AuthContent = (isLogin, onAuthenticate) => {

   const [credentialsValidity, setCredentialsValidity] = useState({ // single state handling multiple properties (user credentials)
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
   });

   // Submit handling user credentials
   const submitHandler = (credentials) => {


   }
   return (
      <View>
         <AuthForm />
      </View>
   )

}

export default AuthContent;