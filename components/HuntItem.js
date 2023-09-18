import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const HuntItem = ({ name, estimatedTime, onHuntPress }) => {
   return (
      <Pressable onPress={onHuntPress}>
         <View style={{ flexDirection: 'row' }}>
            <View style={styles.huntIcon}>
               <Ionicons name="compass-outline" size={40} color={Colors.chocolate} />
            </View>
            <View style={styles.container}>
               <Text style={styles.title} >{name}</Text>
               <Text style={styles.text}>{estimatedTime}</Text>
            </View>
         </View>
      </Pressable>
   )
}


const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      marginVertical: 5,
      marginHorizontal: 20
   },
   title: {
      fontFamily: "nerko",
      color: Colors.mainWhite,
      fontSize: 21
   },
   text: {
      fontFamily: "Arial",
      color: Colors.mainWhite,
      fontSize: 16
   },
   huntIcon: {
      margin: 8,
      backgroundColor: Colors.darkOrange,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width: 45,
   },

});

export default HuntItem;