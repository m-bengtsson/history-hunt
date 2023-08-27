import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useContext, useState } from "react";

import { UserContext } from "../store/UserContext";
import InviteCard from "../components/InviteCard";
import FontLoader from "../components/UI/FontLoader";
import Title from "../components/UI/Title"
import Button from "../components/UI/Button"
import { useNavigation } from "@react-navigation/native";

const InviteScreen = () => {
   const userCtx = useContext(UserContext);
   const [selectedFriendEmails, setSelectedFriendEmails] = useState([]);

   const navigation = useNavigation()

   const toggleSelectedFriend = (email) => {
      setSelectedFriendEmails((prevSelected) =>
         prevSelected.includes(email)
            ? prevSelected.filter((selectedEmail) => selectedEmail !== email)
            : [...prevSelected, email]
      );
   }

   const renderFriend = (itemData) => {
      const friend = itemData.item;
      const isSelected = selectedFriendEmails.includes(friend.email);
      return <InviteCard {...friend} isSelected={isSelected} onSelect={toggleSelectedFriend} />;
   };

   const navigateToMapScreen = () => {
      navigation.navigate('MapScreen', { invitedFriends: selectedFriendEmails })
   }


   return (
      <FontLoader>
         <View style={styles.container}>
            <View>

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
            <View style={styles.buttonContainer}>
               <Button title='Continue' onPress={navigateToMapScreen} />
            </View>
         </View>
      </FontLoader>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'column'
   },
   wrapper: {
      flexWrap: 'wrap',
      margin: 10
   },
   buttonContainer: {
      padding: 40,
   },
   text: {
      color: Colors.mainWhite,
      fontSize: 40,
   }
})

export default InviteScreen;