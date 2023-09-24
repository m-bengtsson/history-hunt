import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const Medal = ({ name }) => {
   return (
      <View style={styles.container}>
         <View style={styles.innerContainer}>
            <View style={styles.huntIcon}>
               <FontAwesome5 name="medal" size={40} color={Colors.darkOrange} />
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
      width: 90,
      alignSelf: 'center'
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
      //rbackgroundColor: "#405ba0",
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
   },

});

export default Medal;