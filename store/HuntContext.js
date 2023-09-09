import { createContext, useState, useEffect } from "react"
import * as http from "../util/http"

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

   /*    const huntsResp = await http.getHunts()
      const huntsData = huntsResp.data;
   
      for (const huntId in huntsData) {
         const hunt = huntsData[huntId];
         huntCtx.addHunt(hunt)
      } */

   useEffect(() => {
      const fetchHunts = async () => {
         try {
            const resp = await http.getHunts();
            const huntsData = Object.values(resp).map(hunt => ({
               name: hunt.name,
               estimatedTime: hunt.estimatedTime,
               locations: hunt.locations,
               invited: hunt.invited,
               createdBy: hunt.createdBy
            }))
            setHunts(huntsData)
         } catch (error) {
            console.error("Error fetching user collection data:", error);
         }
      };
      fetchHunts();
   }, []);


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