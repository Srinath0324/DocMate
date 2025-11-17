import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/auth/Splash';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import SendAppointment from '../screens/stackNavigation/sendAppointment/SendAppointment';
import CommanProfile from '../screens/stackNavigation/commanProfile/CommanProfile';
import CommanList from '../screens/stackNavigation/commanList/CommanList';
import SendReview from '../screens/stackNavigation/sendReview/SendReview';
import DoctorList from '../screens/stackNavigation/doctorList/DoctorList';
import SendCommanAppointment from '../screens/stackNavigation/sendCommanAppointment/SendCommanAppointment';
import Payment from '../screens/stackNavigation/Payment/Payment';
import AppointmentDetails from '../screens/stackNavigation/appointmentDetails/AppointmentDetails';
import CategoryDetail from '../screens/stackNavigation/categoryDetail/CategoryDetail';
import ClinicProfile from '../screens/stackNavigation/clinicProfile/ClinicProfile';
import DoctorProfile from '../screens/stackNavigation/doctorProfile/DoctorProfile';
import LabProfile from '../screens/stackNavigation/labProfile/LabProfile';
import HospitalProfile from '../screens/stackNavigation/hospitalProfile/HospitalProfile';
import doctorAppointment from '../screens/stackNavigation/doctorAppointment/doctorAppointment';
import LabAppointment from '../screens/stackNavigation/labAppointment/LabAppointment';
import HospitalAppointment from '../screens/stackNavigation/hospitalAppointment/HospitalAppointment';
import AdminCreateMeeting from '../screens/admin/AdminCreateMeeting';
import JoinMeeting from '../screens/stackNavigation/joinMeeting/JoinMeeting';
import AppointmentDetail from '../screens/admin/appointment/AppointmentDetail';
import EditScreen from '../screens/admin/site/EditScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = ({ navigationRef }: { navigationRef: any }) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SendAppointment" component={SendAppointment} />
        <Stack.Screen name="CommanProfile" component={CommanProfile} />
        <Stack.Screen name="CommanList" component={CommanList}  />
        <Stack.Screen name="SendReview" component={SendReview} />
        <Stack.Screen name="DoctorList" component={DoctorList} />
        <Stack.Screen name="SendCommanAppointment" component={SendCommanAppointment} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
        <Stack.Screen name="ClinicProfile" component={ClinicProfile} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
        <Stack.Screen name="LabProfile" component={LabProfile} />
        <Stack.Screen name="HospitalProfile" component={HospitalProfile} />
        <Stack.Screen name="doctorAppointment" component={doctorAppointment} />
        <Stack.Screen name="LabAppointment" component={LabAppointment} />
        <Stack.Screen name="HospitalAppointment" component={HospitalAppointment} />
        <Stack.Screen name="AdminCreateMeeting" component={AdminCreateMeeting} />
        <Stack.Screen name="JoinMeeting" component={JoinMeeting} />
        <Stack.Screen name="AdminAppointmentDetail" component={AppointmentDetail} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;