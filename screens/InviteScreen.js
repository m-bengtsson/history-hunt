import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useContext, useState } from "react";

import { UserContext } from "../store/UserContext";
import InviteCard from "../components/InviteCard";
import FontLoader from "../components/UI/FontLoader";
import Title from "../components/UI/Title"

const InviteScreen = () => {
   const userCtx = useContext(UserContext);
   const [selectedFriendEmails, setSelectedFriendEmails] = useState([]);

   const toggleSelectedFriend = (email) => {
      console.log('email', email)

   }


   const renderFriend = (itemData) => {
      const friend = itemData.item;
      const isSelected = selectedFriendEmails.includes(friend.email);
      return <InviteCard {...friend} isSelected={isSelected} onSelect={toggleSelectedFriend} />;
   };

   return (
      <FontLoader>
         <View style={styles.container}>
            <Title>Invite Friends</Title>
            <SafeAreaView style={styles.safeArea}>
               <FlatList
                  columnWrapperStyle={styles.wrapper}
                  data={userCtx.users}
                  renderItem={renderFriend}
                  keyExtractor={item => item.email}
                  horizontal={false}
                  numColumns={3}
               />
            </SafeAreaView>
         </View>
      </FontLoader>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   wrapper: {
      flexWrap: 'wrap',
      margin: 10
   },
   text: {
      color: Colors.mainWhite,
      fontSize: 40,
   }
})

export default InviteScreen;