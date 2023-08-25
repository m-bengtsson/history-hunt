import { createContext, useEffect, useState } from "react"
import * as http from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext({
   users: [],
   currentUser: { name: null, email: null },
   setCurrentUser: (name, email) => { },
   addUser: (name, email) => { }
});


const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({ name: null, email: null });
   const [users, setUsers] = useState([]);


   const addUser = (name, email) => {
      setUsers(prev => [...prev, { name, email }]);
   };


   const value = {
      users,
      currentUser,
      setCurrentUser,
      addUser
   }
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContextProvider;
