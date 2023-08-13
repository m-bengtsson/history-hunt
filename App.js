import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StartScreen from './screens/StartScreen';
import Colors from './constants/Colors';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import { useContext } from 'react';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
   return (
      <Stack.Navigator screenOptions={{
         headerStyle: { backgroundColor: '#f5f5f5' },
         contentStyle: { backgroundColor: Colors.trueBlue }
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
const Navigation = () => {
   const authCtx = useContext(AuthContext);

   return (
      <NavigationContainer>
         {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
   )
}

export default function App() {
   return (
      <>
         <StatusBar style="light" />
         <AuthContextProvider>
            <Navigation />
         </AuthContextProvider>
      </>
   );
}
