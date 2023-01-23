
import { StyleSheet } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import StackProvider from './src/StackProvider';
import { theme } from './src/core/theme'


export default function App() {
  
  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <StackProvider/>
        </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
