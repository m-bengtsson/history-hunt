import { useFonts, NerkoOne_400Regular } from '@expo-google-fonts/nerko-one';

const FontLoader = ({ children }) => {
   const [fontsLoaded, fontError] = useFonts({
      NerkoOne_400Regular,
   });

   if (!fontsLoaded && !fontError) {
      return null;
   }

   return children;
};

export default FontLoader;
