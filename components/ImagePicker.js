import { View, StyleSheet, Text } from 'react-native';
import { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import IconButton from './UI/IconButton';
import Colors from '../constants/Colors';

const ImagePicker = () => {
   const cameraRef = useRef()

   const takePicture = () => {

   }

   return (
      <View>
         <Camera ref={cameraRef} type={CameraType.back} style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton icon="camera" size={52} color='white' onPress={takePicture} />

            </View>
         </Camera>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: 400,
      height: 700,
      justifyContent: 'flex-end',
      alignSelf: 'center'

   },
   iconContainer: {
      alignSelf: 'center'
   },
})

export default ImagePicker;