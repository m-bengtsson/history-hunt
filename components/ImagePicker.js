import {
   View,
   StyleSheet,
   Text,
   Image,
   Button,
   TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import IconButton from "./UI/IconButton";
import Colors from "../constants/Colors";

const ImagePicker = ({ photo, setPhoto }) => {
   const cameraRef = useRef();
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
            <Text style={{ textAlign: "center" }}>
               We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View>
      );
   }

   const takePicture = async () => {
      if (cameraRef.current) {
         const takenPhoto = await cameraRef.current.takePictureAsync({
            quality: 0.7,
            exif: false,
         });
         setPhoto(takenPhoto);
      }
   };

   let previewContent = <Text style={styles.text}>No image taken yet.</Text>;

   function toggleCameraType() {
      setType((current) =>
         current === CameraType.back ? CameraType.front : CameraType.back
      );
   }

   return (
      <View>
         <Camera ref={cameraRef} type={type} style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton
                  icon="camera"
                  size={52}
                  color={Colors.mainWhite}
                  onPress={takePicture}
               />
            </View>
            <View style={styles.buttonContainer}>
               <TouchableOpacity
                  style={styles.cameraFlip}
                  onPress={toggleCameraType}
               >
                  <MaterialCommunityIcons
                     name="camera-flip"
                     size={34}
                     color={Colors.mainWhite}
                  />
               </TouchableOpacity>
            </View>
         </Camera>
         {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.photo}></Image>
         ) : (
            <View style={styles.preview}>{previewContent}</View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: 350,
      height: 350,
      justifyContent: "flex-end",
      alignSelf: "center",
      margin: 20,
      borderRadius: 24,
   },
   buttonContainer: {
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 20,
   },
   iconContainer: {
      alignSelf: "center",
      position: "absolute",
   },
   preview: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: 200,
   },
   photo: {
      width: 200,
      height: 200,
      borderRadius: 200,
      alignSelf: "center",
      marginBottom: 10,
   },
   text: {
      fontSize: 24,
      fontFamily: "nerko",
      fontWeight: "bold",
      color: Colors.mainWhite,
   },
   cameraFlip: {
      position: "absolute",
      bottom: 270,
      right: 5,
   },
});

export default ImagePicker;
