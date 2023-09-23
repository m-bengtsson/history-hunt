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
            const huntsData = Object.entries(resp).map(([huntId, hunt]) => {

               return ({
                  id: huntId,
                  name: hunt.name,
                  estimatedTime: hunt.estimatedTime,
                  locations: hunt.locations,
                  invited: hunt.invited,
                  createdBy: hunt.createdBy,
                  finishedBy: hunt.finishedBy ? hunt.finishedBy : [],
               })
            })
            setHunts(huntsData)

         } catch (error) {
            console.error("Error fetching hunt collection data:", error);
         }
      };
      fetchHunts();
   }, []);

   // "finishedBy": {
   //    "-Nf2U4W6RWjeEA_VwVeX": [Object], { email: @}
   //    "-Nf2bHbnzizj-uAUgr74": [Object],
   //       "0": "hej"
   // }
   // hunts.map(setHunts(hunt => [...hunt.finishedBy, "matilda"]))
   // setHunts()



   const addHunt = (hunt) => {
      setHunts(prevHunts => [...prevHunts, hunt]);
   }


   /*    const updateHunt = (huntId, email) => {
         const updatedHunts = hunts.map(hunt => {
            if (hunt.id === huntId) {
               return { ...hunt, finishedBy: [...hunt.finishedBy, email] };
            }
            return hunt;
         });
   
         setHunts(updatedHunts);
   
   
      } */

   const value = {
      hunts,
      addHunt,
      //updateHunt
   }

   return (
      <HuntContext.Provider value={value}>{children}</HuntContext.Provider>
   )
};

export default HuntContextProvider;