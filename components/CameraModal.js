import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import ImagePicker from "./ImagePicker";
import Colors from "../constants/Colors";
import Button from "./UI/Button";

const CameraModal = ({
   isVisible,
   toggleCamera,
   setPhoto,
   photo,
   pressHandler,
}) => {
   return (
      <View>
         <Modal isVisible={isVisible}>
            <View>
               <MaterialIcons
                  name="cancel"
                  size={44}
                  color={Colors.mainWhite}
                  onPress={toggleCamera}
               />
               <View style={styles.modalContainer}>
                  <ImagePicker setPhoto={setPhoto} photo={photo} />
               </View>
               <Button title="Confirm photo" onPress={pressHandler} />
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
