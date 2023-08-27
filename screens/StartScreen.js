import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";


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
   const [isModalVisible, setModalVisible] = useState(false);


   useEffect(() => {
      const fetchData = async () => {
         try {
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

   const toggleCamera = () => {
      setModalVisible(!isModalVisible);

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
            <View style={styles.modalWrapper}>
               <Modal isVisible={isModalVisible}>
                  <View >
                     <MaterialIcons name="cancel" size={44} color={Colors.mainWhite} onPress={toggleCamera} />
                     <View style={styles.modalContainer}>
                        <ImagePicker />
                     </View>
                  </View>
               </Modal>
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
