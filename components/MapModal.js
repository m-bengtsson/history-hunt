import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { createLocationUrl } from "../util/location";
import SmallTitle from "../components/UI/SmallTitle";
import Modal from "react-native-modal";
import Button from "./UI/Button";

const MapModal = ({ isModalVisible, name, timeDuration, confirmHunt, pinnedLocation, toggleModal }) => {
   return (
      <Modal isVisible={isModalVisible}>
         <View style={styles.container}>
            <MaterialIcons
               name="cancel"
               size={44}
               color={Colors.mainWhite}
               onPress={toggleModal}
            />
            <View style={styles.modalContainer}>
               <SmallTitle>You picked:</SmallTitle>
               <Text>{name}</Text>
               <SmallTitle>Here is the route you will be taking:</SmallTitle>
               <Image style={styles.mapImage} source={{ uri: createLocationUrl(pinnedLocation) }} />
               <SmallTitle>
                  This should take approximately: {timeDuration}
               </SmallTitle>
            </View>
            <View style={styles.buttonContainer}>
               <Button title="Confirm Hunt" onPress={confirmHunt} />
            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   container: {
      alignContent: 'center',
      justifyContent: 'center'
   },
   buttonContainer: {
      padding: 20,
   },
   modalContainer: {
      height: 500,
      backgroundColor: Colors.trueBlue,
      borderRadius: 30,
      padding: 20,
      alignItems: 'center'
   },
   map: {
      height: 650,
   },
   mapImage: {
      width: "100%",
      height: 200,
   },
});

export default MapModal;
