import { useState, useEffect, Text } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from 'expo-location';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import CameraModal from "../components/CameraModal";


const GameScreen = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const { hunt } = route.params;

   const [pinnedLocation, setPinnedLocation] = useState([]);
   const [permission, requestPermission] = Location.useForegroundPermissions();
   const [currentLocation, setCurrentLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   const [isModalVisible, setModalVisible] = useState(false);
   const [locationPhoto, setLocationPhoto] = useState();

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
      getCurrentLocation();
   }, [])

   if (!currentLocation) {
      return <LoadingOverlay message="Loading user location.." />
   }
   const toggleCamera = () => {
      setModalVisible(!isModalVisible);
   }

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;

      // filtrera existerande pins
      const indexAlreadyExists = pinnedLocation.findIndex(loc => loc.latitude === latitude && loc.longitude === longitude);
      toggleCamera()
   }

   const confirmPhoto = () => {

      toggleCamera();
   }

   return (
      <View style={styles.container}>
         <View >
         </View>
         <MapView
            style={styles.map}
            initialRegion={currentLocation}
            showsUserLocation={true}
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
            <Marker
               pinColor="blue"
               coordinate={currentLocation}
               title={`Your location`}
            />
         </MapView>
         <CameraModal
            isVisible={isModalVisible}
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
   mapImage: {
      width: '100%',
      height: 200
   }
});

export default GameScreen;