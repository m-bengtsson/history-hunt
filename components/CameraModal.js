import { View, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";

import Colors from "../constants/Colors";
import ImagePicker from "./ImagePicker";



const CameraModal = ({ onPress, isModalVisible }) => {
   return (
      <View style={styles.modalWrapper}>
         <Modal isVisible={isModalVisible}>
            <View >
               <MaterialIcons name="cancel" size={44} color={Colors.mainWhite} onPress={onPress} />
               <View style={styles.modalContainer}>
                  <ImagePicker />
               </View>
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