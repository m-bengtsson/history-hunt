
// filtrera existerande pins
/*  const indexAlreadyExists = hunt.locations.findIndex(loc => loc.latitude === latitude && loc.longitude === longitude); */

/*    useEffect(() => {
      confirmedPhoto 
      
      if (confirmedPhoto.length === hunt.locations.length) {
         navigation.goBack('StartScreen')
      }
   }, []) */
import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from 'expo-location';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import CameraModal from "../components/CameraModal";
import Modal from "react-native-modal";
import SmallTitle from "../components/UI/SmallTitle";
import Button from "../components/UI/Button";
import Title from "../components/UI/Title";
import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import * as http from "../util/http"

const GameScreen = () => {
   const huntCtx = useContext(HuntContext)
   const { currentUser } = useContext(UserContext)

   const navigation = useNavigation();
   const route = useRoute();
   const { hunt } = route.params;
   //console.log('hunt: ', hunt)
   //const [permission, requestPermission] = Location.useForegroundPermissions();
   //const [errorMsg, setErrorMsg] = useState(null);
   const [currentLocation, setCurrentLocation] = useState(null);
   const [isCameraModalVisible, setCameraModalVisible] = useState(false);
   const [locationPhoto, setLocationPhoto] = useState();
   const [confirmedPhoto, setConfirmedPhoto] = useState([]);
   const [isModalVisible, setModalVisible] = useState(false);

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };
   const toggleCamera = () => {
      setCameraModalVisible(!isCameraModalVisible);
   }

   useEffect(() => {
      const getCurrentLocation = async () => {
         const location = await Location.getCurrentPositionAsync();
         setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
         })
      }
      setTimeout(() => {
         if (confirmedPhoto.length === hunt.locations.length) {
            setModalVisible(!isModalVisible);
            huntCtx.updateHunts(hunt.id, currentUser.email);
            http.updateHunt(hunt.id, currentUser.email)
         }
      }, 1000)

      getCurrentLocation();
   }, [confirmedPhoto, hunt.locations])


   if (!currentLocation) {
      return <LoadingOverlay message="Loading user location.." />
   }

   const markerHandler = (event) => {
      // const latitude = event.nativeEvent.coordinate.latitude;
      // const longitude = event.nativeEvent.coordinate.longitude;
      toggleCamera()
   }

   const confirmPhoto = () => {
      setConfirmedPhoto([...confirmedPhoto, locationPhoto]);
      toggleCamera();
   }

   const navigateToStartScreen = () => {
      navigation.goBack('StartScreen')
   }

   return (
      <View style={styles.container}>
         <View >
         </View>
         <MapView
            style={styles.map}
         /* initialRegion={currentLocation}
         showsUserLocation={true} */
         >
            {hunt.locations.map((location, index) => (
               <Marker
                  key={index}
                  pinColor="red"
                  coordinate={location}
                  title={`Pinned location ${index + 1}`}
                  onPress={markerHandler}

               />
            ))}
            {/*             <Marker
               pinColor="blue"
               coordinate={currentLocation}
               title={`Your location`}
            /> */}
         </MapView>
         <Modal isVisible={isModalVisible}>
            <View >
               <View style={styles.modalContainer}>
                  <Title>Congratulations! </Title>
                  <View>
                     <SmallTitle>You have succefully finished </SmallTitle>
                     <Title>{hunt.name} </Title>
                  </View>
               </View>
               <Button title='Go to Home' onPress={navigateToStartScreen} />
            </View>
         </Modal>
         <CameraModal
            isVisible={isCameraModalVisible}
            toggleCamera={toggleCamera}
            setPhoto={setLocationPhoto}
            photo={locationPhoto}
            pressHandler={confirmPhoto}
         />
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   buttonContainer: {
      padding: 20
   },
   map: {
      height: 1000,

   },
   buttonContainer: {
      padding: 20

   },
   modalContainer: {
      height: 500,
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
      padding: 20,
   },


});

export default GameScreen;