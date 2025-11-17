import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppointmentHistoryNavigator from './AppointmentHistoryTopTabs';
import ProfileNavigator from './ProfileTopTabs';
import HomeScreen from '../screens/bottomStack/home/HomeScreen';
import SearchScreen from '../screens/bottomStack/search/SearchScreen';
import AdminHome from '../screens/admin/home/AdminHome';
import AdminAppointment from '../screens/admin/appointment/AdminAppointment';
import Site from '../screens/admin/site/Site';
import AdminProfile from '../screens/admin/profile/AdminProfile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }: any) => {
  const userType = route.params?.userType || 'user';

  if (userType === 'admin') {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0066CC',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { paddingBottom: 5, height: 60 },
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="AdminHome" 
          component={AdminHome}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="AdminAppointment" 
          component={AdminAppointment}
          options={{
            tabBarLabel: 'Appointments',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'calendar' : 'calendar-outline'} 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Site" 
          component={Site}
          options={{
            tabBarLabel: 'Sites',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'business' : 'business-outline'} 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="AdminProfile" 
          component={AdminProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="AppointmentHistory" 
        component={AppointmentHistoryNavigator}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'calendar' : 'calendar-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'search' : 'search-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
