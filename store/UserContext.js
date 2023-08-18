import { createContext, useState } from "react"

export const UserContext = createContext({
   users: [],
   setCurrentUser: () => { },
   addUser: (name, email) => { }
});


const UserContextProvider = ({ children }) => {
   const [name, setName] = useState(null)
   const [email, setEmail] = useState(null)
   const [users, setUsers] = useState([])



   const setCurrentUser = (name, email) => {
      setName(name);
      setEmail(email);
   }

   const addUser = (name, email) => {
      setUsers([...users, { name, email }]);
   };

   const value = {
      users,
      setCurrentUser,
      addUser
   }
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContext