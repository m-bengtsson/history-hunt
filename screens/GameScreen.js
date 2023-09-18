import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import Title from "../components/UI/Title";



const GameScreen = () => {

   const navigation = useNavigation();
   const route = useRoute();
   const { hunt } = route.params;

   const [pinnedLocation, setPinnedLocation] = useState([]);
   const [permission, requestPermission] = Location.useForegroundPermissions();
   const [isModalVisible, setModalVisible] = useState(false);


   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };

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

   const confirmHunt = () => {

   }


   const initialRegion = {
      latitude: 57.70486618888211,
      longitude: 11.967065748958134,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0121
   }

   return (
      <View style={styles.container}>
         <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={markerHandler}
         >
            {hunt.locations.map((location, index) => (
               <Marker
                  key={index}
                  pinColor="red"
                  coordinate={location}
                  title={`Pinned location ${index + 1}`}
               />
            ))}
         </MapView>
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
   mapImage: {
      width: '100%',
      height: 200
   }
});

export default GameScreen;