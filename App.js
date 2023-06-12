import { StyleSheet, Text, View, StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';

export default function App() {
   return (
      <View style={styles.container}>
         <StatusBar style="auto" />
         <LoginScreen />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60
   },
});
