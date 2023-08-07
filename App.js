import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StartScreen from './screens/StartScreen';
import Colors from './constants/Colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
   return (
      <Stack.Navigator screenOptions={{
         headerStyle: { backgroundColor: '#f5f5f5' },
      }}>
         <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name='SignupScreen' component={SignupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
   )
}

const AuthenticatedStack = () => {
   return (
      <Stack.Navigator screenOptions={{
         headerStyle: { backgroundColor: '#f5f5f5' },
         headerShown: false
      }}>
         <Stack.Screen name='StartScreen' component={StartScreen} />
      </Stack.Navigator>
   )
}

export default function App() {
   return (
      <>
         <StatusBar />
         <NavigationContainer>
            <AuthStack />
         </NavigationContainer>
      </>
   );
}
