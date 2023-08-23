import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import { useState } from 'react';

const LocationPicker = () => {
   const [location, setLocation] = useState(null);

   const [permission, requestPermission] = Location.useForegroundPermissions();





   return (
      <View style={styles.container}>

      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
})

export default LocationPicker;