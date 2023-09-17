import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useContext, useEffect, useState, useLayoutEffect } from "react";

import { HuntContext } from "../store/HuntContext";
import SmallTitle from "./UI/SmallTitle";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";
import Colors from "../constants/Colors";

const HuntStatus = () => {
   const huntCtx = useContext(HuntContext);
   const userCtx = useContext(UserContext);
   const currentUser = userCtx.currentUser;


   const huntsCreated = huntCtx.hunts.filter(
      (hunt) => hunt.createdBy === currentUser.email
   );
   const huntsInvited = huntCtx.hunts.filter((hunt) => {
      return (
         Array.isArray(hunt.invited) && hunt.invited.includes(currentUser.email)
      );
   });
   useEffect(() => {
      userCtx.setUserHunts({ created: huntsCreated, active: huntsInvited })
   }, [])

   console.log(userCtx.userHunts)

   return (
      <>
         <View style={styles.huntsContainer}>
            <ScrollView style={styles.scrollContainer}>
               <SmallTitle color={Colors.darkerBlue} marginTop={10}>
                  Active Hunts
               </SmallTitle>
               {huntsInvited.map((hunt, index) => (
                  <HuntItem
                     key={index}
                     name={hunt.name}
                     estimatedTime={hunt.estimatedTime}
                  />
               ))}
               <SmallTitle color={Colors.darkerBlue}>Created hunts</SmallTitle>
               {huntsCreated.map((hunt, index) => (
                  <HuntItem
                     key={index}
                     name={hunt.name}
                     estimatedTime={hunt.estimatedTime}
                  />
               ))}

               <SmallTitle
                  color={Colors.darkerBlue}
                  marginTop={20}
                  alignSelf={"center"}
               >
                  Medals
               </SmallTitle>
            </ScrollView>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   huntsContainer: {
      paddingHorizontal: 30,
      alignItems: "flex-start",
      margin: 30,
      width: "100%",
   },
   scrollContainer: {
      width: "100%",
   },
});

export default HuntStatus;
