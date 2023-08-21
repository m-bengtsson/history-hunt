import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
   token: "",
   /*    userId: "",
      testId: (userId) => { }, */
   isAuthenticated: false,
   authenticate: (token) => { },
   logout: () => { }
})

const AuthContextProvider = ({ children }) => {
   const [token, setToken] = useState(null)
   const isAuthenticated = !!token; // convertera truthy och falsy till en riktig boolean
   const [userId, setUserId] = useState(null)

   /*    const testId = (userId) => {
         setUserId(userId)
         // console.log(userId)
      } */

   const authenticate = (token) => {
      setToken(token);
      AsyncStorage.setItem('appToken', token)
   };

   const logout = () => {
      setToken(null);
      AsyncStorage.removeItem('appToken')
   }

   const value = {
      token,
      /*       userId,
            testId, */
      isAuthenticated,
      authenticate,
      logout
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;