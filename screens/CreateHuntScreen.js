import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import FontLoader from "../components/UI/FontLoader";
import Title from "../components/UI/Title";

import * as http from "../util/http"

const CreateHuntScreen = () => {
   const [enteredHuntName, setEnteredHuntName] = useState("");


   const pressHandler = () => {
      http.storeHunt({ name: 'skattjakt' })
   }

   return (
      <FontLoader>
         <View style={styles.container}>
            <Title>Customize</Title>
            <Input
               label='How long should it be?'
               textInputConfig={{
                  keyboardType: 'default',
                  //onChangeText: inputHandler.bind(this, 'hunt-name'),
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