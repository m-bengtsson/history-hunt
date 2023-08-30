import { createContext, useReducer } from "react"

export const HuntContext = createContext({
   hunts: [],
   addHunt: ({ name, estimatedTime, locations, invited: [] }) => { },
   updateHunt: (id) => { },
   finishHunt: (id) => { }
});


const huntReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         return [id, { ...action.payload }, ...state]

      case 'UPDATE':

   }
}

const HuntContextProvider = ({ children }) => {
   const [huntState, dispatch] = useReducer(huntReducer)

   const addHunt = (hunt) => {
      dispatch({ action: 'ADD', payload: hunt })

   }



   const value = {
      addHunt
   }

   return (
      <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
   )
};

export default HuntContextProvider;