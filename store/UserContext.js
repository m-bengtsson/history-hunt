import { createContext, useEffect, useState } from "react"
import * as http from "../util/http";

export const UserContext = createContext({
   users: [],
   currentUser: { name: null, email: null },
   setCurrentUser: (name, email) => { },
   addUser: (name, email) => { }
});


const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({ name: null, email: null });
   const [users, setUsers] = useState([])

   // fetch usercollection


   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const userData = await http.getUserCollection()
            console.log('userData', userData)
         } catch (error) {
            console.log('UserContext, Error fetching users', error)
         }
      }
      fetchUsers()

   }, [])

   const addUser = (name, email) => {
      setUsers([...users, { name, email }]);
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
