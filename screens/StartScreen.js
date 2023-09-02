import { View, StyleSheet, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import { HuntContext } from "../store/HuntContext";
import * as http from "../util/http"

import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import Button from "../components/UI/Button";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import SmallTitle from "../components/UI/SmallTitle";
import CameraModal from "../components/CameraModal";
import HuntStatus from "../components/HuntStatus";


const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);
   const huntCtx = useContext(HuntContext);
   const navigation = useNavigation();
   const [userDataLoaded, setUserDataLoaded] = useState(false);
   const [isModalVisible, setModalVisible] = useState(false);
   const [photo, setPhoto] = useState();

   useEffect(() => {
      if (!userDataLoaded) {
         const fetchData = async () => {
            try {
               const resp = await http.getUser(authCtx.token);
               // kollar att det är array med minst en sak
               if (Array.isArray(resp) && resp.length > 0) {
                  const { displayName, email, photoUrl } = resp[0];
                  userCtx.setCurrentUser({ name: displayName, email, photoUrl })
                  setUserDataLoaded(true)
               }
               const huntsResp = await http.getHunts()
               const huntsData = huntsResp.data;

               for (const huntId in huntsData) {
                  const hunt = huntsData[huntId];
                  huntCtx.addHunt(hunt)
                  //console.log('hunts in loop: ', name);
               }

            } catch (error) {
               console.error("Error fetching user data:", error.response?.data || error.message);
               //set athentication här för att logga ut vid invalid token
               authCtx.logout()
            }
            setUserDataLoaded(true);
         };
         fetchData();
      }
   }, []);

   useEffect(() => {
      console.log('updated hunts', huntCtx.hunts);
      for (const huntId in huntCtx.hunts) {
         const hunt = huntCtx.hunts[huntId]
         console.log('name of hunt: ', hunt.name)

         //const { name } = hunt.name;
         console.log('hunts in loop: ', hunt);
      }

   }, [huntCtx.hunts]);

   const pressHandler = () => {
      navigation.navigate('CreateHuntScreen');
   }

   const toggleCamera = () => {
      setModalVisible(!isModalVisible);
   }

   if (!userDataLoaded || !userCtx.currentUser.name) {
      return <LoadingOverlay message="Loading user data..." />
   }
   const updatePhotoHandler = async () => {
      try {
         await http.updateUserPhoto(photo.uri, authCtx.token)
         userCtx.updatePhotoUrl(photo.uri);

      } catch (error) {
         (error)
      }
      toggleCamera()
   };

   return (
      <View style={styles.container}>
         <View style={styles.iconContainer}>
            <IconButton
               icon='log-out-outline'
               color={Colors.darkerBlue}
               size={35}
               onPress={authCtx.logout}
            />
         </View>
         {userCtx.currentUser.photoUrl ? (<View style={styles.ifPhoto}>
            <Image source={{ uri: userCtx.currentUser.photoUrl }} style={styles.pictureContainer} />
            <AntDesign name="edit" size={30} color={Colors.darkOrange} onPress={toggleCamera} />
         </View>

         ) :
            <View style={styles.pictureContainer}>
               <AntDesign name="edit" size={30} color={Colors.darkOrange} onPress={toggleCamera} />
            </View>
         }
         <SmallTitle>{userCtx.currentUser.name}</SmallTitle>
         <CameraModal
            isVisible={isModalVisible}
            toggleCamera={toggleCamera}
            setPhoto={setPhoto}
            photo={photo}
            updatePhotoHandler={updatePhotoHandler}
         />
         <HuntStatus name={userCtx.currentUser.name} />
         <Button title='Create Hunt' onPress={pressHandler} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.trueBlue,
      flexDirection: 'column',
      alignItems: "center",
      paddingBottom: 20,
   },
   pictureContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: Colors.darkerBlue,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
   },
   ifPhoto: {
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
