import axios from "axios"
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import { AuthContext } from "../store/AuthContext";
import { useContext, useEffect, useState } from "react";

const StartScreen = () => {
   const authCtx = useContext(AuthContext)
   const [message, setMessage] = useState(null)

   useEffect(() => {
      axios.get(`https://history-hunt-f8704-default-rtdb.europe-west1.firebasedatabase.app/test.json?auth=${authCtx.token}`)
         .then((resp) => {
            console.log(resp.data)
            setMessage(resp.data)
         });
   }, [])
   return (
      <View style={styles.container}>
         <View style={styles.iconContainer}>
            <IconButton
               icon='exit'
               color={'blue'}
               size={35}
               onPress={authCtx.logout}
            />
         </View>
         <Text>Start screen</Text>
         <Text>Message from server: {message}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
   },
   iconContainer: {
      alignSelf: 'flex-end'
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
   },
});

export default StartScreen;