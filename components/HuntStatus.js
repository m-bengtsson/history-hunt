import { View, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";

import { HuntContext } from "../store/HuntContext";
import SmallTitle from "./UI/SmallTitle";
import { UserContext } from "../store/UserContext";

const HuntStatus = () => {

   const huntCtx = useContext(HuntContext)
   const userCtx = useContext(UserContext)
   const currentUser = userCtx.currentUser;
   //console.log('user', currentUser)

   let foundMatch = false;

   for (const huntId in huntCtx.hunts) {
      const hunt = huntCtx.hunts[huntId]

      if (hunt.createdBy === currentUser.email) {
         huntCtx.addToCreatedHunts(hunt)
         foundMatch = true;
      } else if (!foundMatch) {
         const isInvited = hunt.invited.includes(currentUser.email)

         console.log('invited: ', isInvited)
      } else (
         console.log('not invited')
      )
   }
   if (!foundMatch) {

   }

   return (
      <>
         <View style={styles.huntsContainer}>
            <SmallTitle>Active Hunts: </SmallTitle>
            <SmallTitle>Created hunts: </SmallTitle>
            <SmallTitle>Medals: </SmallTitle>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   huntsContainer: {
      alignItems: 'flex-start',

   },
});

export default HuntStatus;