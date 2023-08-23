import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import FontLoader from "../components/UI/FontLoader";
import Title from "../components/UI/Title";

import * as http from "../util/http"
import { useNavigation, useRoute } from "@react-navigation/native";


const CreateHuntScreen = () => {
   const [enteredHuntName, setEnteredHuntName] = useState("");
   const [pickedLocation, setPickedLocation] = useState([])

   const route = useRoute()
   const navigation = useNavigation()

   useEffect(() => {
      if (route.params?.location) {
         setPickedLocation(prev => [...prev, route.params.location])
      }
   }, [route])

   console.log('picked location', pickedLocation)
   //console.log('rout params location', route.params.location)

   const pressHandler = () => {
      //http.storeHunt({ name: 'skattjakt' })
      navigation.navigate('MapScreen')
   }

   const inputHandler = () => {


   }
   return (
      <FontLoader>
         <View style={styles.container}>
            <Title>Customize</Title>
            <Input
               label='How long should it be?'
               textInputConfig={{
                  keyboardType: 'default',
                  onChangeText: inputHandler.bind(this, 'huntName'),
                  //value: enteredHuntName,
                  //isInvalid: huntNameIsInvalid,
                  autoCapitalize: 'none'

               }} />
            <Input
               label='What do you want to call your hunt?'
               textInputConfig={{
                  keyboardType: 'default',
                  //onChangeText: inputHandler.bind(this, 'hunt-name'),
                  //value: enteredHuntName,
                  //isInvalid: huntNameIsInvalid,
                  autoCapitalize: 'none'

               }} />
            <Button title={'Continue'} onPress={pressHandler} />
         </View>
      </FontLoader>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 70,
      padding: 40
   }

})

export default CreateHuntScreen;