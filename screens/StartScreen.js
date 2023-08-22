import axios from "axios"
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import Button from "../components/UI/Button";
import FontLoader from "../components/UI/FontLoader";
import * as http from "../util/http"
import { UserContext } from "../store/UserContext";
import ImagePicker from "../components/ImagePicker";


const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);

   const navigation = useNavigation();

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const resp = await http.getUser(authCtx.token);

            // kollar att det är array med minst en sak
            if (Array.isArray(resp) && resp.length > 0) {
               // första objectet i resp listan(en user)   
               const { displayName, email } = resp[0];
               userCtx.setCurrentUser({ name: displayName, email })

            }
         } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
            //set athentication här för att logga ut vid invalid token
            authCtx.logout(authCtx.token)
         }
      }
      fetchUser();
   }, [authCtx]);

   console.log(userCtx.currentUser, 'username and email',)

   /*   useEffect(() => {
        axios.get(`https://history-hunt-f8704-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${authCtx.token}`)
           .then((resp) => {
              console.log('users', resp.data);
              // hämta ut localId??
           });
     }, [authCtx]) */




   const pressHandler = () => {
      //navigation.navigate('CreateHuntScreen');
      navigation.navigate('MapScreen');

   }

   const takeProfilePicture = () => {
      return (
         <ImagePicker />
      )
   }

   return (
      <FontLoader>
         <View style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton
                  icon='log-out-outline'
                  color={Colors.darkerBlue}
                  size={35}
                  onPress={authCtx.logout}
               />
            </View>
            {/*             <FontAwesome name='user-circle' color={'white'} size={200} />
            
 */}
            <View style={styles.pictureContainer}>
               <IconButton icon="camera" size={35} color={Colors.mainWhite} onPress={takeProfilePicture} />
            </View>
            <Text>{userCtx.currentUser.name}</Text>
            <Text>Active Hunts</Text>
            <Text>Planned hunts</Text>
            <Text>Medals</Text>
            <Button title='Create Hunt' onPress={pressHandler} />
         </View>
      </FontLoader>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.trueBlue,
      justifyContent: 'flex-start',
      alignItems: "center",
      padding: 32,
   },
   pictureContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: Colors.darkerBlue,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
   },
   pictureIcon: {
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
   },
   iconContainer: {
      alignSelf: 'flex-end'

   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: 'NerkoOne_400Regular',
      marginBottom: 8,
   },
});

export default StartScreen;
