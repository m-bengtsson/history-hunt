import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';

import IconButton from './UI/IconButton';
import Colors from '../constants/Colors';
import { UserContext } from '../store/UserContext';

const InviteCard = () => {
   const userCtx = useContext(UserContext)

   return (
      <View style={styles.container}>


      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   text: {
      color: Colors.mainWhite,
      fontSize: 40,
   }
})

export default InviteCard;