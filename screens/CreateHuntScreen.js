import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import Title from "../components/UI/Title";


const CreateHuntScreen = () => {
   const [enteredHuntName, setEnteredHuntName] = useState("");
   const [enteredTimeDuration, setEnteredTimeDuration] = useState("");

   const navigation = useNavigation()

   const inputHandler = (inputType, enteredValue) => {
      switch (inputType) {
         case 'hunt-name':
            setEnteredHuntName(enteredValue);
            break;
         case "time-duration":
            setEnteredTimeDuration(enteredValue);
            break;
      }
   };
   const navigateToInviteScreen = () => {

      navigation.navigate('InviteScreen', { name: enteredHuntName, timeDuration: enteredTimeDuration })
   }

   return (
      <View style={styles.container}>
         <Title>Customize</Title>
         <Input
            label='What do you want to call your hunt?'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'hunt-name'),
               value: enteredHuntName,
               //isInvalid: huntNameIsInvalid,
               autoCapitalize: 'none'

            }} />
         <Input
            label='How long should it be?'
            textInputConfig={{
               keyboardType: 'default',
               onChangeText: inputHandler.bind(this, 'time-duration'),
               value: enteredTimeDuration,
               //isInvalid: huntNameIsInvalid,
               autoCapitalize: 'none'

            }} />
         <Button title={'Invite friends'} onPress={navigateToInviteScreen} />
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