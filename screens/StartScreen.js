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
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Title from "../components/UI/Title";


const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);
   const navigation = useNavigation();
   const [userDataLoaded, setUserDataLoaded] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            /*  const userData = await http.getUserCollection();
            
                        for (const userId in userData) {
                           const user = userData[userId];
                           await userCtx.addUser(user.name, user.email);
                        } */
            // kollar att det är array med minst en sak
            const resp = await http.getUser(authCtx.token);
            if (Array.isArray(resp) && resp.length > 0) {
               const { displayName, email } = resp[0];
               userCtx.setCurrentUser({ name: displayName, email })
               setUserDataLoaded(true)
            }
         } catch (error) {
            console.error("Error fetching user data:", error.response?.data || error.message);
            //set athentication här för att logga ut vid invalid token
            authCtx.logout(authCtx.token)
         }
      }
      fetchData()
   }, []);


   if (!userDataLoaded) {
      return <LoadingOverlay message="Loading user data..." />
   }

   const pressHandler = () => {
      navigation.navigate('CreateHuntScreen');

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
            <Title>{userCtx.currentUser.name}</Title>
            <View style={styles.huntsContainer}>
               <Title>Active Hunts</Title>
               <Title>Planned hunts</Title>
               <Title>Medals</Title>

            </View>
            <Button title='Create Hunt' onPress={pressHandler} />
         </View>
      </FontLoader>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.trueBlue,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: "center",
      padding: 0,
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
   huntsContainer: {
      alignItems: 'flex-start'
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: 'NerkoOne_400Regular',
      marginBottom: 8,
   },
});

export default StartScreen;
