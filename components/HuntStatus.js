import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';



import { HuntContext } from "../store/HuntContext";
import SmallTitle from "./UI/SmallTitle";
import { UserContext } from "../store/UserContext";
import HuntItem from "./HuntItem";
import Colors from "../constants/Colors";

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
            <ScrollView style={styles.scrollContainer}>
               <SmallTitle color={Colors.darkerBlue}>Created hunts: </SmallTitle>
               {createdHunts.map((hunt, key) => (
                  <HuntItem name={hunt.name} estimatedTime={hunt.estimatedTime} />
               ))}
               <SmallTitle color={Colors.darkerBlue} marginTop={10} >Active Hunts: </SmallTitle>

               <SmallTitle color={Colors.darkerBlue} marginTop={20} alignSelf={"center"}>Medals</SmallTitle>
            </ScrollView>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   huntsContainer: {
      paddingHorizontal: 30,
      alignItems: 'flex-start',
      margin: 30,
      height: 300,
      width: '100%'
   },
   scrollContainer: {
      width: '100%'

   }
});

export default HuntStatus;
