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
   const [enteredTimeDuration, setEnteredTimeDuration] = useState();
   const [pickedLocation, setPickedLocation] = useState([]);

   const route = useRoute()
   const navigation = useNavigation()
   /* 
      useEffect(() => {
         if (route.params?.location) {
            setPickedLocation(prev => [...prev, route.params.location])
         }
      }, [route])
   
      console.log('picked location', pickedLocation) */

   const pressHandler = () => {
      navigation.navigate('MapScreen')
   }

   const navigateToInviteScreen = () => {
      navigation.navigate('InviteScreen')
   }

   const inputHandler = (inputType, enteredValue) => {
      switch (inputType) {
         case 'hunt-name':
            setEnteredHuntName(enteredValue);
            console.log(enteredHuntName)
            break;
         case "time-duration":
            setEnteredTimeDuration(enteredValue);
            break;
      }
   };

   const submitHandler = () => {
      const hunt =
      {
         name: enteredHuntName,
         timeDuration: enteredTimeDuration,
         locations: pickedLocation,
         //invited: invitedPeople
      }
   };



   return (
      <View style={styles.container}>
         <FontLoader>
            <Title>Customize</Title>
            <Input
               label='How long should it be?'
               textInputConfig={{
                  keyboardType: 'default',
                  onChangeText: inputHandler.bind(this, 'hunt-name'),
                  value: enteredHuntName,
                  //isInvalid: huntNameIsInvalid,
                  autoCapitalize: 'none'

               }} />
            <Input
               label='What do you want to call your hunt?'
               textInputConfig={{
                  keyboardType: 'default',
                  onChangeText: inputHandler.bind(this, 'time-duration'),
                  value: enteredTimeDuration,
                  //isInvalid: huntNameIsInvalid,
                  autoCapitalize: 'none'

               }} />
            <Button title={'Choose Location'} onPress={pressHandler} />
            {/*             <Button title={'Continue'} onPress={submitHandler} />
 */}
            <Button title={'Invite friends'} onPress={navigateToInviteScreen} />

         </FontLoader>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 70,
      padding: 40
   }

})

export default CreateHuntScreen;