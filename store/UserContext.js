import { createContext } from "react"

export const UserContext = createContext({
   name: "",
   email: "",
   saveUser: (name, email) => { }
});


const UserContextProvider = ({ children }) => {
   const [name, setName] = useState(null)
   const [email, setEmail] = useState(null)


   const currentUser = (localId) => {

   }

   const saveUser = (name, email) => {
      setName(name);
      setEmail(email);
   };

   const value = {
      name,
      email
   }
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContext