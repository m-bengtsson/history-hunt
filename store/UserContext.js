import { createContext } from "react"

export const UserContext = ({
   hunts: [],
   photoUrl: null,
   addUser: ({ name, email, id }) => { },
})



export const AuthContext = createContext({
   token: "",
   isAuthenticated: false,
   authenticate: (token) => { },
   logout: () => { }
})

const AuthContextProvider = ({ children }) => {
   const [token, setToken] = useState(null)
   const isAuthenticated = !!token; // convertera truthy och falsy till en riktig boolean

   const authenticate = (token) => {
      setToken(token)
      AsyncStorage.setItem('appToken', token)
   };

   const logout = () => {
      setToken(null);
      AsyncStorage.removeItem('appToken')
   }

   const value = {
      token,
      isAuthenticated,
      authenticate,
      logout
   }
}

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>