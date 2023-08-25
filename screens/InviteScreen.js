import { View, Text } from "react-native";
import * as http from "../util/http"
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";


const InviteScreen = () => {
   const userCtx = useContext(UserContext);

   /*    useEffect(() => {
         const fetchUser = async () => {
            try {
               const resp = await http.getUserCollection();
               userCtx
               console.log(resp)
   
            } catch (error) {
               console.error("Error fetching user data:", error.response?.data || error.message);
               //set athentication här för att logga ut vid invalid token
            }
         }
         fetchUser();
      }, [userCtx]); */
   console.log('all users', userCtx.users)



   return (
      <View>
         <Text>Invite screen</Text>
      </View>
   )
}

export default InviteScreen;