import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css';

import SignUp from './app/auth/signup';
import SignIn from 'app/auth/signin';
import ForgotPassword from 'app/auth/forgotPassword';
import BottomTabNavigator from 'components/general/BottomTabNavigator';
import ReportForm from 'app/reportFacilities/reportForm';
import ReportFeedback from 'app/reportFacilities/reportFeedback';
import MeritIndex from 'app/meritSystem/meritIndex';
import ScanQRCode from 'app/meritSystem/scanQRCode';
import FacilityIndex from 'app/facilityNavigation/facilityIndex';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false}}/>
          <Stack.Screen name="ReportForm" component={ReportForm} options={{title: 'Report Form'}}/>
          <Stack.Screen name="ReportFeedback" component={ReportFeedback} options={{ title: 'Report Feedback'}} />
          <Stack.Screen name="MeritIndex" component={MeritIndex} options={{ title: 'Merit'}} />
          <Stack.Screen name="ScanQRCode" component={ScanQRCode} options={{ headerShown: false }} />
          <Stack.Screen name="FacilityIndex" component={FacilityIndex} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
