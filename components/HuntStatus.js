import { useContext, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";
import Medal from "./Medal";
import SmallTitle from "./UI/SmallTitle";
import Colors from "../constants/Colors";

const HuntStatus = () => {
   const huntCtx = useContext(HuntContext);
   const userCtx = useContext(UserContext);
   const currentUser = userCtx.currentUser;
   const navigation = useNavigation();

   const huntsCreated = huntCtx.hunts.filter(
      (hunt) => hunt.createdBy === currentUser.email && !hunt.finishedBy?.includes(currentUser.email)
   );

   const huntsInvited = huntCtx.hunts.filter(
      (hunt) =>
         Array.isArray(hunt.invited) &&
         hunt.invited.includes(currentUser.email) &&
         !hunt.finishedBy?.includes(currentUser.email)
   );

   const huntsFinished = huntCtx.hunts.filter(
      (hunt) => hunt.finishedBy?.includes(currentUser.email)
   );

   useEffect(() => {
      userCtx.setUserHunts({ created: huntsCreated, active: huntsInvited });
   }, []);

   const startHuntHandler = (hunt) => {
      navigation.navigate("GameScreen", { hunt });
   };

   return (
      <View style={styles.container}>
         <View style={styles.scrollContainer}>
            <SmallTitle color={Colors.darkerBlue} marginTop={10}>
               Active Hunts
            </SmallTitle>
            <View style={styles.huntsContainer}>
               {huntsInvited.map((hunt) => (
                  <Pressable key={hunt.id} onPress={() => startHuntHandler(hunt)}>
                     <HuntItem
                        name={hunt.name}
                        estimatedTime={hunt.estimatedTime}
                     />
                  </Pressable>
               ))}
            </View>
            <SmallTitle color={Colors.darkerBlue}>Created hunts</SmallTitle>
            <View style={styles.huntsContainer}>
               {huntsCreated.map((hunt) => (
                  <Pressable key={hunt.id} onPress={() => startHuntHandler(hunt)}>
                     <HuntItem
                        name={hunt.name}
                        estimatedTime={hunt.estimatedTime}
                     />
                  </Pressable>
               ))}
            </View>
            <SmallTitle
               color={Colors.darkerBlue}
               marginTop={20}
               alignSelf={"center"}
            >
               Medals
            </SmallTitle>
            <View style={styles.medals}>
               {huntsFinished.map((hunt) => (
                  <View key={hunt.id}>
                     <Medal
                        name={hunt.name}
                     />
                  </View>
               ))}
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   medals: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      width: "100%",
      justifyContent: 'center'
   },
   container: {
      paddingHorizontal: 30,
      alignItems: "flex-start",
      margin: 30,
      width: "100%",
   },
   scrollContainer: {
      width: "100%",
   },
   huntsContainer: {
      flexDirection: 'column-reverse'
   },
});

export default HuntStatus;
