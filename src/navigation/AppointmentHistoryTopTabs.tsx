import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet,} from 'react-native';
import UpComing from '../screens/bottomStack/AppointmentHistory/upComing/UpComing';
import CancelScreen from '../screens/bottomStack/AppointmentHistory/Cancel/CancelScreen';
import CompleteScreen from '../screens/bottomStack/AppointmentHistory/complete/CompleteScreen';
import { getUserAppointments } from '../services/Get';
import { AppointmentsProvider, useAppointments } from '../context/AppointmentsContext';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import { getToken } from '../api/api';

const Tab = createMaterialTopTabNavigator();

const AppointmentTabs = () => {
  const { setLoading, setAppointments } = useAppointments();
  const navigation = useNavigation();
  
  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await getUserAppointments();
      console.log('Appointments Response:', response);
      if (response && response.data) {
        const upcomingAppointments = response.data.filter(
          (app: any) => app.appointmentStatus === "Pending" || app.appointmentStatus === "Confirmed"
        );
        const cancelledAppointments = response.data.filter(
          (app: any) => app.appointmentStatus === "Cancelled"
        );
        const completedAppointments = response.data.filter(
          (app: any) => app.appointmentStatus === "Complete"
        );

        setAppointments({
          upcoming: upcomingAppointments,
          cancelled: cancelledAppointments,
          complete: completedAppointments
        });
      }
    }
    catch (error) {
      if (error && error == 'Unauthorized User! Please Login again.') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login', params: { fromProfile: true } }],
          })
        );
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#999',
        tabBarIndicatorStyle: { backgroundColor: '#0066CC', height: 3 },
        tabBarLabelStyle: { fontWeight: '500' },
        tabBarStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#eee' },
      }}
      tabBarPosition="top"
      initialLayout={{ width: 100 }}
    >
      <Tab.Screen name="Upcoming" component={UpComing} />
      <Tab.Screen name="Cancelled" component={CancelScreen} />
      <Tab.Screen name="Complete" component={CompleteScreen} />
    </Tab.Navigator>
  );
};

const AppointmentHistoryNavigator = () => {
  const [token, setToken] = React.useState();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        const token = getToken();
        setToken(token);
        if (!token) {
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login', params: { fromProfile: true } }],
              })
            );
          }, 0);
        }
      };
      checkAuth();

    }, [])
  );

  if (!token) {
    return null;
  }

  return (
    <AppointmentsProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Appointment History</Text>
        </View>
        <AppointmentTabs />
      </View>
    </AppointmentsProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AppointmentHistoryNavigator;
