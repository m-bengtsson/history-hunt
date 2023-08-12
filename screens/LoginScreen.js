import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import Button from "../components/UI/Button";
import AuthContent from "../components/Auth/AuthContent";
//import LoginForm from '../components/LoginForm'

const LoginScreen = () => {


   const navigation = useNavigation()
   const navigateToSignup = () => {
      navigation.navigate('SignupScreen')

   }

   const continueLogin = () => {
      // Implment authentication
      navigation.navigate('StartScreen')
   }

   return (
      <View >
         <AuthContent isLogin />
      </View>
   )
}

export default LoginScreen;