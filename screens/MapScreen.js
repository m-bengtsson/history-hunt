import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";


const { height, width } = Dimensions.get('window')

const MapScreen = () => {


   return (
      <View>
         <MapView
            style={styles.map}
            region={{
               latitude: 37.78825,
               longitude: -122.4324,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
            }}
         >
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