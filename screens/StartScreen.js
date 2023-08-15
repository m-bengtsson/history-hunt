import axios from "axios"
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../store/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import Button from "../components/UI/Button";
import FontLoader from "../components/UI/FontLoader";

// innehåll startscreen:

const StartScreen = () => {
   const authCtx = useContext(AuthContext);
   const [message, setMessage] = useState(null);
   const navigation = useNavigation();

   useEffect(() => {
      axios.get(`https://history-hunt-f8704-default-rtdb.europe-west1.firebasedatabase.app/test.json?auth=${authCtx.token}`)
         .then((resp) => {
            console.log(resp.data);
            setMessage(resp.data);
         });
   }, [])

   const pressHandler = () => {
      navigation.navigate('CreateHuntScreen');
   }

   return (
      <FontLoader>
         <View style={styles.container}>
            <View style={styles.iconContainer}>
               <IconButton
                  icon='log-out-outline'
                  color={Colors.darkerBlue}
                  size={35}
                  onPress={authCtx.logout}
               />
            </View>
            <FontAwesome name='user-circle' color={'white'} size={200} />
            <Text>Name</Text>
            <Text>Active Hunts</Text>
            <Text>Planned hunts</Text>
            <Text>Medals</Text>
            <Button title='Create Hunt' onPress={pressHandler} />
         </View>
      </FontLoader>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.trueBlue,
      justifyContent: 'flex-start',
      alignItems: "center",
      padding: 32,
   },
   iconContainer: {
      alignSelf: 'flex-end'
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: 'NerkoOne_400Regular',
      marginBottom: 8,
   },
});

export default StartScreen;
