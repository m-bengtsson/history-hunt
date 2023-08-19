import { createContext, useState } from "react"

export const UserContext = createContext({
   users: [],
   currentUser: { name: null, email: null },
   setCurrentUser: (name, email) => { },
   addUser: (name, email) => { }
});


const UserContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({ name: null, email: null });
   const [users, setUsers] = useState([])

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
