import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

import Button from "../components/UI/Button";
import Colors from "../constants/Colors";
import Title from "../components/UI/Title";
import * as http from "../util/http";
import { UserContext } from "../store/UserContext";
import { HuntContext } from "../store/HuntContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import MapModal from "../components/MapModal";
import Logo from "../components/UI/Logo";
import LogoButton from "../components/UI/LogoButton";

const MapScreen = () => {
   const [pinnedLocation, setPinnedLocation] = useState([]);
   //const [permission, requestPermission] = Location.useForegroundPermissions();
   const [currentLocation, setCurrentLocation] = useState(null);

   const [invited, setInvited] = useState([]);
   const [isModalVisible, setModalVisible] = useState(false);

   const userCtx = useContext(UserContext);
   const huntCtx = useContext(HuntContext);

   const navigation = useNavigation();
   const route = useRoute();
   const { name, timeDuration } = route.params;

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };
   useEffect(() => {
      const getCurrentLocation = async () => {
         const location = await Location.getCurrentPositionAsync();
         setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
         });
      };
      if (route.params?.invitedFriends) {
         setInvited((prev) => [...prev, ...route.params.invitedFriends]);
      }

      getCurrentLocation();
   }, [route]);

   if (!currentLocation) {
      return <LoadingOverlay message="Loading user location.." />;
   }

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;

      // filtrera existerande pins
      const indexAlreadyExists = pinnedLocation.findIndex(
         (loc) => loc.latitude === latitude && loc.longitude === longitude
      );

      if (indexAlreadyExists !== -1) {
         // ta bort pin
         const updatePinnedLocations = pinnedLocation.filter(
            (pin, index) => index !== indexAlreadyExists
         );
         setPinnedLocation(updatePinnedLocations);
      } else {
         // add pin
         setPinnedLocation((prev) => [...prev, { latitude, longitude }]);
      }
   };

   const confirmHunt = () => {
      const hunt = {
         name: name,
         estimatedTime: timeDuration,
         locations: pinnedLocation,
         invited: invited,
         createdBy: userCtx.currentUser.email,
      };
      try {
         http.storeHunt(hunt);
         huntCtx.addHunt(hunt);
         navigation.navigate("StartScreen");
      } catch (error) {
         console.log(error);
      }
   };

   const initialRegion = {
      latitude: 57.70486618888211,
      longitude: 11.967065748958134,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0121,
   };

   return (
      <View style={styles.container}>
         <MapView
            style={styles.map}
            initialRegion={currentLocation}
            onPress={markerHandler}
            showsUserLocation={true}
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
            <Button title="Confirm" onPress={toggleModal} />
         </View>
         <View style={styles.modalWrapper}>
            <MapModal
               isModalVisible={isModalVisible}
               confirmHunt={confirmHunt}
               pinnedLocation={pinnedLocation}
               timeDuration={timeDuration}
               name={name}
               toggleModal={toggleModal}

            />
            {/*             <Modal isVisible={isModalVisible}>
               <View>
                  <MaterialIcons
                     name="cancel"
                     size={44}
                     color="black"
                     onPress={toggleModal}
                  />
                  <View style={styles.modalContainer}>
                     <SmallTitle>You picked</SmallTitle>
                     <SmallTitle>Here is the route you will be taking:</SmallTitle>
                     <Image style={styles.mapImage} source={{ uri: createLocationUrl({ centerLat: initialRegion.latitude, centerLng: initialRegion.longitude }, pinnedLocation) }} />
                     <SmallTitle>
                        This should take approximately: {timeDuration}
                     </SmallTitle>
                  </View>
                  <Button title="Confirm Hunt" onPress={confirmHunt} />
               </View>
            </Modal> */}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   buttonContainer: {
      position: "absolute",
      width: "60%",
      alignSelf: 'center',
      bottom: 30
   },
   map: {
      height: 800,
   },
   mapImage: {
      width: "100%",
      height: 200,
   },
});

export default MapScreen;
