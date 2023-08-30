import { createContext, useEffect, useState } from "react"
import * as http from "../util/http";

export const UserContext = createContext({
   users: [],
   currentUser: { name: null, email: null, photoUrl: null },
   setCurrentUser: (name, email, photoUrl) => { },
   addUser: (name, email) => { },

});

const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({ name: null, email: null, photoUrl: null });
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const userData = await http.getUserCollection();
            const fetchedUsers = Object.values(userData).map(user => ({
               name: user.name,
               email: user.email,
            }));

            setUsers(fetchedUsers);
         } catch (error) {
            console.error("Error fetching user collection data:", error);
         }
      };
      fetchUsers();
   }, []);


   const addUser = (name, email) => {
      if (!users.some(user => user.email === email)) {
         setUsers(prevUsers => [...prevUsers, { name, email }]);
      }
   };

   const updatePhotoUrl = (photoUrl) => {
      setCurrentUser(prevUser => ({ ...prevUser, photoUrl }));
   };

   const value = {
      users,
      currentUser,
      setCurrentUser,
      addUser,
      updatePhotoUrl,
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContextProvider;
