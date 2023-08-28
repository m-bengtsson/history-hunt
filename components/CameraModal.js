import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";

import Colors from "../constants/Colors";
import ImagePicker from "./ImagePicker";



const CameraModal = ({ toggleCamera, isModalVisible }) => {

   const [photo, setPhoto] = useState();

   const choosePhotoHandler = () => {
      console.log('user photo', photo)


   }

   return (
      <View style={styles.modalWrapper}>
         <Modal isVisible={isModalVisible}>
            <View >
               <MaterialIcons name="cancel" size={44} color={Colors.mainWhite} onPress={toggleCamera} />
               <View style={styles.modalContainer}>
                  <ImagePicker setPhoto={setPhoto} photo={photo} />
               </View>
               <AntDesign name="checkcircleo" size={24} color={Colors.mainWhite} onPress={choosePhotoHandler} />
            </View>

         </Modal>
      </View>
   )
}

const styles = StyleSheet.create({

   modalContainer: {
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
   }
});

export default CameraModal;