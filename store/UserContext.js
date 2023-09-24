import { createContext, useEffect, useState } from "react";
import * as http from "../util/http";

export const UserContext = createContext({
   users: [],
   addUser: (name, email,) => { },
   currentUser: { name: null, email: null, photoUrl: null },
   setCurrentUser: (name, email, photoUrl) => { },
   setUserHunts: ([]) => { },
   userHunts: [],
});

const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({
      name: null,
      email: null,
      photoUrl: null,
      hunts: [],
   });

   const [userHunts, setUserHunts] = useState([]);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const userData = await http.getUserCollection();
            const usersArray = Object.entries(userData).map(([userId, user]) => ({
               id: userId,
               name: user.name,
               email: user.email,
            }));
            setUsers(usersArray);
         } catch (error) {
            //console.error("Error fetching user collection data:", error);
         }
      };

      fetchUsers();
   }, []);
   const addUser = (name, email) => {
      setUsers(prev => [...prev, { name, email }])
   }

   const updatePhotoUrl = (photoUrl) => {
      setCurrentUser((prevUser) => ({ ...prevUser, photoUrl }));
   };

   const value = {
      users,
      currentUser,
      setCurrentUser,
      updatePhotoUrl,
      setUserHunts,
      userHunts,
      addUser,
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContextProvider;
