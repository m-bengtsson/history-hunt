import { View, StyleSheet } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import Button from "../components/UI/Button";
import FontLoader from "../components/UI/FontLoader";
import * as http from "../util/http"
import { UserContext } from "../store/UserContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import SmallTitle from "../components/UI/SmallTitle";
import CameraModal from "../components/CameraModal";
import HuntStatus from "../components/HuntStatus";


const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const userCtx = useContext(UserContext);
   const navigation = useNavigation();
   const [userDataLoaded, setUserDataLoaded] = useState(false);
   const [isModalVisible, setModalVisible] = useState(false);


   useEffect(() => {
      if (!userDataLoaded) {
         const fetchData = async () => {
            try {
               const resp = await http.getUser(authCtx.token);

               // kollar att det är array med minst en sak
               if (Array.isArray(resp) && resp.length > 0) {
                  const { displayName, email } = resp[0];

                  //console.log('name: ', displayName)

                  userCtx.setCurrentUser({ name: displayName, email })
                  setUserDataLoaded(true)
               }
            } catch (error) {
               console.error("Error fetching user data:", error.response?.data || error.message);
               //set athentication här för att logga ut vid invalid token
            }
            setUserDataLoaded(true);
         };
         fetchData();
      }
   }, [authCtx.token, userDataLoaded, userCtx]);

   //console.log('user photo', userCtx.currentUser)

   const pressHandler = () => {
      navigation.navigate('CreateHuntScreen');
   }

   const toggleCamera = () => {
      setModalVisible(!isModalVisible);
   }

   if (!userDataLoaded || !userCtx.currentUser.name) {
      return <LoadingOverlay message="Loading user data..." />
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
            <View style={styles.pictureContainer}>
               <AntDesign name="edit" size={30} color={Colors.darkOrange} onPress={toggleCamera} />
            </View>
            <SmallTitle>{userCtx.currentUser.name}</SmallTitle>
            <CameraModal toggleCamera={toggleCamera} isModalVisible={isModalVisible} />
            <HuntStatus name={userCtx.currentUser.name} />
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
      alignItems: "center",
      paddingBottom: 20,
   },
   modalContainer: {
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
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
