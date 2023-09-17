import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { useRoute } from "@react-navigation/native";
import Title from "../components/UI/Title";


const GameScreen = () => {

   const route = useRoute();
   const { hunt } = route.params;

   console.log('hunt', hunt)

   return (
      <View >
         <Title>{hunt.name}</Title>
      </View>
   )
}


const styles = StyleSheet.create({


});

export default GameScreen;