import 'react-native-gesture-handler';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StartScreen from './screens/StartScreen';
import Colors from './constants/Colors';

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f5f5f5' },
            headerShown: false
         }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignupScreen' component={SignupScreen} />
            <Stack.Screen name='StartScreen' component={StartScreen} />
         </Stack.Navigator>
         <StatusBar />
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   /*    container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: 60
      }, */
});
