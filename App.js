import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
