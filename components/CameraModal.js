import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ImagePicker from './ImagePicker';
import Colors from '../constants/Colors';

const CameraModal = ({ isVisible, toggleCamera, setPhoto, photo, updatePhotoHandler }) => {
   return (
      <View>
         <Modal isVisible={isVisible}>
            <View>
               <MaterialIcons name="cancel" size={44} color={Colors.mainWhite} onPress={toggleCamera} />
               <View style={styles.modalContainer}>
                  <ImagePicker setPhoto={setPhoto} photo={photo} />
               </View>
               <AntDesign name="checkcircleo" size={24} color={Colors.mainWhite} onPress={updatePhotoHandler} />
            </View>
         </Modal>
      </View>
   );
};

const styles = StyleSheet.create({
   modalContainer: {
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
   },
});

export default CameraModal;
