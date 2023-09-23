import { createContext, useState, useEffect } from "react"
import * as http from "../util/http"

export const HuntContext = createContext({
   hunts: [],
});

const HuntContextProvider = ({ children }) => {
   const [hunts, setHunts] = useState([]);

   useEffect(() => {
      const fetchHunts = async () => {
         try {
            const resp = await http.getHunts();
            const huntsData = Object.entries(resp).map(([huntId, hunt]) => ({
               id: huntId,
               name: hunt.name,
               estimatedTime: hunt.estimatedTime,
               locations: hunt.locations,
               invited: hunt.invited,
               createdBy: hunt.createdBy
            }))
            //console.log('huntsdata here: ', huntsData)
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

   const value = {
      hunts,
      addHunt
   }

   return (
      <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
   )
};

export default HuntContextProvider;