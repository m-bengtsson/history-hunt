import { createContext, useEffect, useState } from "react"
import * as http from "../util/http";

export const UserContext = createContext({
   users: [],
   currentUser: { name: null, email: null, photoUrl: null },
   setCurrentUser: (name, email, photoUrl) => { },
   addUser: (name, email) => { },
   setUserHunts: ([]) => { },
   userHunts: []

});
/* addToActiveHunts: () => { },
   addToCreatedHunts: () => { },
      updateHunt: (id) => { },
         finishHunt: (id) => { } */

const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      {
         name: null,
         email: null,
         photoUrl: null,
         hunts: []
      });

   const [userHunts, setUserHunts] = useState([]);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const userData = await http.getUserCollection();
            /* const fetchedUsers = Object.values(userData).map(user => (console.log(user))) */
            setUsers(userData);
         } catch (error) {
            console.error("Error fetching user collection data:", error);
         }
      };
      fetchUsers();
   }, []);


   //Object.values((users.map(user => console.log(user))))



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
      setUserHunts,
      userHunts
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContextProvider;
