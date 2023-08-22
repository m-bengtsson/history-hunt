import { View, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import IconButton from './UI/IconButton';
import Colors from '../constants/Colors';

const ImagePicker = () => {
   const cameraRef = useRef()

   const takePicture = () => {

   }

   return (
      <View style={styles.container}>
         <Camera ref={cameraRef} type={CameraType.back}>
            <IconButton icon="camera" size={32} color='white' onPress={takePicture} />
         </Camera>
         <Text style={styles.text}>Camera</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   text: {
      color: Colors.mainWhite,
      fontSize: 40,
   }
})

export default ImagePicker;