import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import CreateHuntScreen from "./screens/CreateHuntScreen";
import Colors from "./constants/Colors";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import UserContextProvider from "./store/UserContext";
import HuntContextProvider from "./store/HuntContext";
import MapScreen from "./screens/MapScreen";
import InviteScreen from "./screens/InviteScreen";
import FontLoader from "./components/UI/FontLoader";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerStyle: { backgroundColor: "#f5f5f5" },
            contentStyle: { backgroundColor: Colors.trueBlue },
         }}
      >
         <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
};

const AuthenticatedStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerStyle: { backgroundColor: Colors.trueBlue },
            headerShown: true,
            contentStyle: { backgroundColor: Colors.trueBlue },
            title: "",
            headerTintColor: Colors.darkerBlue,
            headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 30,
               fontFamily: "nerko",
               color: Colors.mainWhite,
            },
         }}
      >
         <Stack.Screen name="StartScreen" component={StartScreen} />
         <Stack.Screen name="GameScreen" component={GameScreen} />
         <Stack.Screen name="CreateHuntScreen" component={CreateHuntScreen} />
         <Stack.Screen name="InviteScreen" component={InviteScreen} />
         <Stack.Screen name="MapScreen" component={MapScreen} options={{
            title: 'Choose location',
            headerTintColor: Colors.darkerBlue,
            headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 40,
               fontFamily: "nerko",
               color: Colors.mainWhite,
            },
         }} />
      </Stack.Navigator>
   );
};
const Navigation = () => {
   const authCtx = useContext(AuthContext);

   useEffect(() => {
      const getToken = async () => {
         const token = await AsyncStorage.getItem("appToken");
         if (token) {
            authCtx.authenticate(token);
         }
      };
      getToken();
   }, [authCtx]);

   return (
      <NavigationContainer>
         {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
   );
};

export default function App() {
   return (
      <>
         <FontLoader>
            <StatusBar style="light" />
            <AuthContextProvider>
               <UserContextProvider>
                  <HuntContextProvider>
                     <Navigation />
                  </HuntContextProvider>
               </UserContextProvider>
            </AuthContextProvider>
         </FontLoader>
      </>
   );
}
