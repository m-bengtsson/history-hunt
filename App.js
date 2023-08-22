import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StartScreen from './screens/StartScreen';
import CreateHuntScreen from './screens/CreateHuntScreen';
import Colors from './constants/Colors';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import UserContextProvider from './store/UserContext';
import MapScreen from './screens/MapScreen';


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
         headerStyle: { backgroundColor: Colors.trueBlue },
         headerShown: true,
         contentStyle: { backgroundColor: Colors.trueBlue },
         title: ''
      }}>
         <Stack.Screen name='StartScreen' component={StartScreen} />
         <Stack.Screen name='MapScreen' component={MapScreen} />
         <Stack.Screen name='CreateHuntScreen' component={CreateHuntScreen} />
      </Stack.Navigator>
   )
}
const Navigation = () => {
   const authCtx = useContext(AuthContext);

   useEffect(() => {
      const getToken = async () => {
         const token = await AsyncStorage.getItem('appToken');
         if (token) {
            authCtx.authenticate(token)
         }
      }
      getToken()
   }, [authCtx])

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
            <UserContextProvider>
               <Navigation />
            </UserContextProvider>
         </AuthContextProvider>
      </>
   );
}
