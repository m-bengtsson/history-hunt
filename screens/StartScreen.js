import { View, StyleSheet, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { ScrollView } from "react-native-gesture-handler";

const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);
   const huntCtx = useContext(HuntContext);
   const navigation = useNavigation();
   const [userDataLoaded, setUserDataLoaded] = useState(false);
   const [isModalVisible, setModalVisible] = useState(false);
   const [photo, setPhoto] = useState();
   const route = useRoute()

   const fetchData = async () => {
      try {
         const resp = await http.getUser(authCtx.token);
         // kollar att det är array med minst en sak
         if (Array.isArray(resp) && resp.length > 0) {
            const { displayName, email, photoUrl } = resp[0];
            userCtx.setCurrentUser({ name: displayName, email, photoUrl })
         }

      } catch (error) {
         <LoadingOverlay message="Loading..." />

         //console.error("Error fetching user data:", error.response?.data || error.message);
         //set athentication här för att logga ut vid invalid token
         authCtx.logout()
      }
      setUserDataLoaded(true);
   };

   useEffect(() => {
      if (!userDataLoaded) {
         fetchData();
      }
   }, [userCtx, authCtx, huntCtx.hunts, route.params]);

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
      <ScrollView>
         <View style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton
                  icon='log-out-outline'
                  color={Colors.darkerBlue}
                  size={35}
                  onPress={authCtx.logout}
               />
            </View>
            {userCtx.currentUser.photoUrl ? (
               <Image source={{ uri: userCtx.currentUser.photoUrl }} style={styles.pictureContainer} />
            ) :
               <View style={styles.pictureContainer} />
            }
            <View style={{ backgroundColor: Colors.darkOrange, padding: 6, borderRadius: 100, position: 'absolute', top: 190, right: 120 }}>
               <MaterialIcons name="edit" size={30} color={Colors.chocolate} onPress={toggleCamera} />

            </View>
            <View style={styles.nameAndEdit}>
               <SmallTitle >{userCtx.currentUser.name}</SmallTitle>
            </View>
            <View style={styles.buttonWrapper}>
               <Button title='Create Hunt' onPress={pressHandler} />
            </View>
            <CameraModal
               isVisible={isModalVisible}
               toggleCamera={toggleCamera}
               setPhoto={setPhoto}
               photo={photo}
               pressHandler={updatePhotoHandler}
            />
            <HuntStatus name={userCtx.currentUser.name} />
         </View>
      </ScrollView>
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
      borderColor: Colors.mainWhite,
      borderWidth: 2,
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
      fontFamily: 'nerko',
      marginBottom: 8,
   },
   nameAndEdit: {
      flexDirection: 'row',
      gap: 12
   },
   buttonWrapper: {

   }
});

export default StartScreen;
