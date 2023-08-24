import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';



const { height, width } = Dimensions.get('window')

const MapScreen = () => {
   const [pinnedLocation, setPinnedLocation] = useState();
   const [permission, requestPermission] = Location.useForegroundPermissions();

   const navigation = useNavigation()

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;
      setPinnedLocation({ latitude, longitude });
   }

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
      <View>
         <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={markerHandler}
         >
            {<Marker
               pinColor="red"
               coordinate={pinnedLocation}
               title="Your pinned location"
            >
            </Marker>}
            <Button title={'Confirm locations'} onPress={confirmLocations} />
         </MapView>
      </View>
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



