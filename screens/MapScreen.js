import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';



const { height, width } = Dimensions.get('window')

const MapScreen = () => {
   const [pinnedLocation, setPinnedLocation] = useState([]);
   const [permission, requestPermission] = Location.useForegroundPermissions();

   const navigation = useNavigation()

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;

      setPinnedLocation(prevLocations => [...prevLocations, { latitude, longitude }]);
   }

   useEffect(() => {
      if (pinnedLocation.length === 0) {
         console.log('No new marker locations');
      } else {
         console.log('New marker locations:', pinnedLocation);
      }
   }, [pinnedLocation]);

   const initialRegion = {
      latitude: 57.70887,
      longitude: 11.97456,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
   }

   const confirmLocations = () => {
      navigation.navigate('CreateHuntScreen', { location: pinnedLocation })
   }

   return (
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
         <Button title={'Confirm locations'} onPress={confirmLocations} />
      </MapView>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      height: height
   },
});

export default MapScreen;



