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
               <SmallTitle color={Colors.darkerBlue}>You picked:</SmallTitle>
               <Text style={styles.name}>{name}</Text>
               <SmallTitle color={Colors.darkerBlue} fontSize={24} margin={10}>Here is the route you will be taking:</SmallTitle>
               <Image style={styles.mapImage} source={{ uri: createLocationUrl(pinnedLocation) }} />
               <SmallTitle color={Colors.darkerBlue} fontSize={24} marginTop={10}>
                  This should take approximately:
               </SmallTitle>
               <Text style={styles.name}>{timeDuration}</Text>
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
   name: {
      color: Colors.mainWhite,
      fontFamily: "nerko",
      fontSize: 36
   },
   buttonContainer: {
      padding: 20,
   },
   modalContainer: {
      height: 550,
      backgroundColor: Colors.trueBlue,
      borderRadius: 15,
      padding: 10,
      alignItems: 'center'
   },
   map: {
      height: 650,
   },
   mapImage: {
      width: "100%",
      height: 250,
   },
});

export default MapModal;
