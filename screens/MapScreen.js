import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";


const { height, width } = Dimensions.get('window')

const MapScreen = () => {

   const [pinnedLocation, setPinnedLocation] = useState(null)

   const initialRegion = {
      latitude: 57.70887,
      longitude: 11.97456,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
   }

   const markerHandler = (event) => {
      const latitude = event.nativeEvent.coordi
   }

   return (
      <View>
         <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={pinnedMarkerHandler}
         >
            <Marker >

            </Marker>
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