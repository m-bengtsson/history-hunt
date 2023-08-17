import { createContext, useReducer } from "react"

export const HuntContext = createContext({
   hunts: [],
   addHunt: (localId, { name, estimatedTime, location, invited: [] }) => { },
   updateHunt: (localId, { }) => { },
   finishHunt: (localId) => { }
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
   return (
      <HuntContext.Provider>{children}</HuntContext.Provider>
   )
};

export default HuntContextProvider;