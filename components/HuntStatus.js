import { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";
import SmallTitle from "./UI/SmallTitle";
import Colors from "../constants/Colors";

const HuntStatus = () => {
   const huntCtx = useContext(HuntContext);
   const userCtx = useContext(UserContext);
   const currentUser = userCtx.currentUser;
   const navigation = useNavigation();

   const huntsCreated = huntCtx.hunts.filter(
      (hunt) => hunt.createdBy === currentUser.email
   );
   const huntsInvited = huntCtx.hunts.filter(
      (hunt) =>
         Array.isArray(hunt.invited) && hunt.invited.includes(currentUser.email)
   );

   useEffect(() => {
      userCtx.setUserHunts({ created: huntsCreated, active: huntsInvited });
   }, []);

   const startHuntHandler = (hunt) => {
      navigation.navigate("GameScreen", { hunt });
   };

   return (
      <View style={styles.huntsContainer}>
         <View style={styles.scrollContainer}>
            <SmallTitle color={Colors.darkerBlue} marginTop={10}>
               Active Hunts
            </SmallTitle>
            {huntsInvited.map((hunt) => (
               <Pressable key={hunt.id} onPress={() => startHuntHandler(hunt)}>
                  <HuntItem
                     name={hunt.name}
                     estimatedTime={hunt.estimatedTime}
                  />
               </Pressable>
            ))}
            <SmallTitle color={Colors.darkerBlue}>Created hunts</SmallTitle>
            {huntsCreated.map((hunt) => (
               <Pressable key={hunt.id} onPress={() => startHuntHandler(hunt)}>
                  <HuntItem
                     name={hunt.name}
                     estimatedTime={hunt.estimatedTime}
                  />
               </Pressable>
            ))}
            <SmallTitle
               color={Colors.darkerBlue}
               marginTop={20}
               alignSelf={"center"}
            >
               Medals
            </SmallTitle>
         </View>
      </View>
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
