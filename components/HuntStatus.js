import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";

import { HuntContext } from "../store/HuntContext";
import SmallTitle from "./UI/SmallTitle";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";

const HuntStatus = () => {
   const huntCtx = useContext(HuntContext);
   const userCtx = useContext(UserContext);
   const currentUser = userCtx.currentUser;
   const [createdHunts, setCreatedHunts] = useState([]);
   //console.log('user', currentUser)

   useEffect(() => {

      const huntsCreated = huntCtx.hunts.filter(
         (hunt) => hunt.createdBy === currentUser.email
      );

      setCreatedHunts(huntsCreated)
      console.log("hunts created: ", huntsCreated);
   }, [huntCtx, currentUser])

   return (
      <>
         <View style={styles.huntsContainer}>
            <ScrollView>
               <SmallTitle>Created hunts: </SmallTitle>
               {createdHunts.map((hunt, key) => (
                  <HuntItem key={key} name={hunt.name} estimatedTime={hunt.estimatedTime} />
               ))}
               <SmallTitle marginTop={10} >Active Hunts: </SmallTitle>

               <SmallTitle>Medals: </SmallTitle>
            </ScrollView>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   huntsContainer: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      margin: 30
   },
});

export default HuntStatus;
