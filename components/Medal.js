import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const Medal = ({ name }) => {
   return (
      <View style={styles.container}>
         <View style={styles.innerContainer}>
            <View style={styles.huntIcon}>
               <Ionicons name="medal" size={40} color={Colors.chocolate} />
            </View>

            <Text style={styles.title} >{name}</Text>

         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      marginVertical: 5,
      marginHorizontal: 10,
      width: 100,
   },
   innerContainer: {
      alignItems: 'center',
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

export default Medal;