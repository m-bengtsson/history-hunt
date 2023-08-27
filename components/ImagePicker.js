import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IconButton from './UI/IconButton';
import Colors from '../constants/Colors';

const ImagePicker = () => {
   const cameraRef = useRef();
   const [photo, setPhoto] = useState();
   const [type, setType] = useState(CameraType.back);
   const [permission, requestPermission] = Camera.useCameraPermissions();


   if (!permission) {
      // Camera permissions are still loading
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
         <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View>
      );
   }

   const takePicture = async () => {
      if (cameraRef.current) {
         const takenPhoto = await cameraRef.current.takePictureAsync({
            quality: 0.7,
            exif: false
         }
         )
         setPhoto(takenPhoto)
         console.log('taken photo', takenPhoto)
      }
   }

   let previewContent = <Text>No image taken yet.</Text>

   function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
   }

   return (
      <View>
         <Camera ref={cameraRef} type={type} style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton
                  icon="camera"
                  size={52}
                  color='white'
                  onPress={takePicture} />
            </View>
            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.button} onPress={toggleCameraType} >
                  <MaterialCommunityIcons name="camera-flip" size={34} color="white" />
               </TouchableOpacity>
            </View>
         </Camera>
         {photo && <Image source={{ uri: photo.uri }} style={styles.photo}></Image>}<View style={styles.preview}></View>

      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: 350,
      height: 400,
      justifyContent: 'flex-end',
      alignSelf: 'center',
      margin: 20,
      borderRadius: 24

   },
   buttonContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 20,
   },
   iconContainer: {
      alignSelf: 'center'
   },
   preview: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   photo: {
      width: 200,
      height: 200,
      borderRadius: 200,
      alignSelf: 'center',
      marginBottom: 10,
   },
   text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
   },
})

export default ImagePicker;