import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useContext, useEffect } from "react";

import * as http from "../util/http"
import { UserContext } from "../store/UserContext";
//import InviteCard from "../components/InviteCard";


const InviteScreen = () => {
   const userCtx = useContext(UserContext);
   //console.log('all users', userCtx.users)

   const InviteCard = ({ name, email }) => {
      return (
         <Text>{name}</Text>
      )
   }


   const renderFriend = (itemData) => {
      const friend = itemData.item;
      console.log(friend)
      return <InviteCard {...friend} />;
   };

   return (
      <View style={styles.container}>
         <SafeAreaView style={styles.safeArea}>
            <FlatList
               data={userCtx.users}
               renderItem={renderFriend}
               keyExtractor={item => item.email}
            />
         </SafeAreaView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   card: {},

   text: {
      color: Colors.mainWhite,
      fontSize: 40,
   }
})

export default InviteScreen;