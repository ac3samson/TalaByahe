import { useFonts, Barlow_600SemiBold, Barlow_700Bold, Barlow_800ExtraBold } from '@expo-google-fonts/barlow';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { TripProvider } from './src/context/TripContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StartTripScreen from './src/screens/StartTripScreen';
import IssueTicketScreen from './src/screens/IssueTicketScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import PassengerListScreen from './src/screens/PassengerListScreen';
import TripSummaryScreen from './src/screens/TripSummaryScreen';
import ReportScreen from './src/screens/ReportScreen';
import { colors, fonts } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
    Barlow_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TripProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.red900 },
            headerTintColor: colors.white,
            headerTitleStyle: { fontFamily: fonts.header },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TalaByahe' }} />
          <Stack.Screen name="StartTrip" component={StartTripScreen} options={{ title: 'Start Trip' }} />
          <Stack.Screen name="IssueTicket" component={IssueTicketScreen} options={{ title: 'Issue Ticket' }} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'Digital Receipt' }} />
          <Stack.Screen name="PassengerList" component={PassengerListScreen} options={{ title: 'Passengers' }} />
          <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />
          <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Issue Report' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TripProvider>
  );
}
