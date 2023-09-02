import { View, StyleSheet, Text } from "react-native";
import { useContext, useEffect, useState } from "react";

import { HuntContext } from "../store/HuntContext";
import SmallTitle from "./UI/SmallTitle";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";

const HuntStatus = () => {
   const huntCtx = useContext(HuntContext);
   const userCtx = useContext(UserContext);
   const currentUser = userCtx.currentUser;
   //console.log('user', currentUser)

   const huntsCreated = huntCtx.hunts.filter(
      (hunt) => hunt.createdBy === currentUser.email
   );
   console.log("hunts created: ", huntsCreated);

   return (
      <>
         <View style={styles.huntsContainer}>
            <SmallTitle>Created hunts: </SmallTitle>
            {huntsCreated.map((hunt, key) => (
               <HuntItem key={key} name={hunt.name} estmatedTime={hunt.estmatedTime} />
            ))}
            <SmallTitle>Active Hunts: </SmallTitle>
            <SmallTitle>Medals: </SmallTitle>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   huntsContainer: {
      alignItems: "flex-start",
   },
});

export default HuntStatus;
