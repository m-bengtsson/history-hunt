import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import { MaterialIcons } from '@expo/vector-icons';

import Button from "../components/UI/Button";
import Colors from "../constants/Colors";
import Title from "../components/UI/Title";
import SmallTitle from "../components/UI/SmallTitle";
import * as http from "../util/http";
import { UserContext } from "../store/UserContext";
import { createLocationUrl } from "../util/location";


const MapScreen = () => {
   const [pinnedLocation, setPinnedLocation] = useState([]);
   const [permission, requestPermission] = Location.useForegroundPermissions();
   const [invited, setInvited] = useState([])
   const [isModalVisible, setModalVisible] = useState(false);

   const userCtx = useContext(UserContext)

   const navigation = useNavigation();
   const route = useRoute();
   const { name, timeDuration } = route.params;

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };

   useEffect(() => {
      if (route.params?.invitedFriends) {
         setInvited(prev => [...prev, ...route.params.invitedFriends])
      }
   }, [route])

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;

      // filtrera existerande pins
      const indexAlreadyExists = pinnedLocation.findIndex(loc => loc.latitude === latitude && loc.longitude === longitude);

      if (indexAlreadyExists !== -1) {
         // ta bort pin
         const updatePinnedLocations = pinnedLocation.filter((pin, index) => index !== indexAlreadyExists);
         setPinnedLocation(updatePinnedLocations);
      } else {
         // add pin
         setPinnedLocation(prev => [...prev, { latitude, longitude }])
      }
   }

   /*    useEffect(() => {
         if (pinnedLocation.length === 0) {
            console.log('No new marker locations');
         } else {
            console.log('New marker locations:', pinnedLocation);
         }
      }, [pinnedLocation]); */


   const confirmHunt = async () => {
      try {
         await http.storeHunt({
            name: name,
            estimatedTime: timeDuration,
            locations: pinnedLocation,
            invited: invited,
            createdBy: userCtx.currentUser.email
         })
         navigation.navigate('StartScreen')
      } catch (error) {
         console.log(error)
      }
   }
   const initialRegion = {
      latitude: 57.70486618888211,
      longitude: 11.967065748958134,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0121
   }

   return (
      <View style={styles.container}>
         <Title >Choose Location</Title>
         <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={markerHandler}
         >
            {pinnedLocation.map((location, index) => (
               <Marker
                  key={index}
                  pinColor="red"
                  coordinate={location}
                  title={`Pinned location ${index + 1}`}
               />
            ))}
         </MapView>
         <View style={styles.buttonContainer}>
            <Button title='Confirm' onPress={toggleModal} />
         </View>
         <View style={styles.modalWrapper}>
            <Modal isVisible={isModalVisible}>
               <View >
                  <MaterialIcons name="cancel" size={44} color="black" onPress={toggleModal} />
                  <View style={styles.modalContainer}>
                     <SmallTitle>You picked: {name}</SmallTitle>
                     <Image style={styles.mapImage} source={{ uri: createLocationUrl({ centerLat: initialRegion.latitude, centerLng: initialRegion.longitude }, pinnedLocation) }} />
                     <SmallTitle>Here is the route you will be taking:</SmallTitle>
                     <SmallTitle>This should take approximately: {timeDuration}</SmallTitle>
                  </View>
                  <Button title='Confirm Hunt' onPress={confirmHunt} />
               </View>
            </Modal>
         </View>
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
   modalWrapper: {
      /*      flex: 1,
           justifyContent: 'space-between',
           flexDirection: 'column',
           borderRadius: 24, */

   },
   modalContainer: {
      height: 500,
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
      padding: 20,
   },
   map: {
      height: 650,

   },
   mapImage: {
      width: '100%',
      height: 200
   }
});

export default MapScreen;



