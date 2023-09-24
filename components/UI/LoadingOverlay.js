import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const LoadingOverlay = ({ message }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.message}>{message}</Text>
         <ActivityIndicator size="small" />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
   },
   message: {
      fontSize: 18,
      marginBottom: 20,
   },
});

export default LoadingOverlay;
