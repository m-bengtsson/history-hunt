import { createContext, useState } from "react"

export const HuntContext = createContext({
   hunts: [],
   activeHunts: [],
   createdHunts: [],
   addHunt: (name, estimatedTime, locations, invited, createdBy) => { },
   addToActiveHunts: () => { },
   addToCreatedHunts: () => { },
   updateHunt: (id) => { },
   finishHunt: (id) => { }
});

const HuntContextProvider = ({ children }) => {
   const [hunts, setHunts] = useState([]);
   const [activeHunts, setActiveHunts] = useState([]);
   const [createdHunts, setCreatedHunts] = useState([]);


   const addHunt = (hunt) => {
      setHunts(prevHunts => [...prevHunts, hunt]);
   }
   const addToActiveHunts = (hunt) => {
      setActiveHunts(prevHunts => [...prevHunts, hunt]);
   }
   const addToCreatedHunts = (hunt) => {
      setCreatedHunts(prevHunts => [...prevHunts, hunt]);
   }

   const value = {
      hunts,
      activeHunts,
      createdHunts,
      addToActiveHunts,
      addToCreatedHunts,
      addHunt
   }

   return (
      <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
   )
};

export default HuntContextProvider;